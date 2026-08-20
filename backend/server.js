const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Import Middlewares
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import Mongoose Models
const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

// Load environment variables from workspace root .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests (Vite runs on port 5173 by default)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Body parser
app.use(express.json());

// Apply Request Logger globally
app.use(requestLogger);

// ==========================================
// Mock In-Memory Data (Task 3 & Task 4)
// ==========================================
let mockBooks = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    isbn: "978-0132350884",
    available: true
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    isbn: "978-0135957059",
    available: true
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    isbn: "978-0262033848",
    available: false
  },
  {
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    category: "Web Development",
    isbn: "978-1491904244",
    available: true
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma",
    category: "Software Design",
    isbn: "978-0201633610",
    available: false
  }
];

let mockBorrowings = [
  {
    id: 1,
    memberName: "Jane Smith",
    bookTitle: "Clean Code",
    borrowDate: "2026-08-15",
    returnDate: "2026-08-25",
    status: "borrowed"
  },
  {
    id: 2,
    memberName: "Alex Miller",
    bookTitle: "Introduction to Algorithms",
    borrowDate: "2026-08-01",
    returnDate: "2026-08-15",
    status: "returned"
  }
];

// ==========================================
// API REST Endpoints (Task 3)
// ==========================================

// 1. GET /api/v1/books - Return all books (Task 3 / 4 API source)
app.get('/api/v1/books', (req, res) => {
  res.status(200).json(mockBooks);
});

// 2. GET /api/v1/borrowings - Return all borrowing records
app.get('/api/v1/borrowings', (req, res) => {
  res.status(200).json(mockBorrowings);
});

// 3. POST /api/v1/borrowings - Create a new borrowing record
app.post('/api/v1/borrowings', (req, res) => {
  const { memberName, bookTitle, borrowDate, returnDate } = req.body;

  if (!memberName || !bookTitle || !borrowDate || !returnDate) {
    return res.status(400).json({
      success: false,
      message: "Please provide memberName, bookTitle, borrowDate, and returnDate"
    });
  }

  const newRecord = {
    id: mockBorrowings.length + 1,
    memberName,
    bookTitle,
    borrowDate,
    returnDate,
    status: "borrowed"
  };

  mockBorrowings.push(newRecord);
  res.status(201).json({
    success: true,
    data: newRecord
  });
});

// ==========================================
// Database Connected Endpoints (Task 5)
// ==========================================

// Seed Books & Members in MongoDB to verify Mongoose schemas are working
app.post('/api/v1/db/seed', async (req, res, next) => {
  try {
    // Clear existing
    await Book.deleteMany({});
    await Member.deleteMany({});
    await Borrowing.deleteMany({});

    // Seed books
    const seededBooks = await Book.create(mockBooks);

    // Seed dummy members
    const seededMembers = await Member.create([
      {
        name: "John Doe",
        email: "john.doe@university.edu",
        phone: "+1234567890",
        department: "Computer Science"
      },
      {
        name: "Emily Watson",
        email: "emily.watson@university.edu",
        phone: "+9876543210",
        department: "Information Technology"
      }
    ]);

    res.status(201).json({
      success: true,
      message: "Database seeded successfully!",
      booksCount: seededBooks.length,
      membersCount: seededMembers.length
    });
  } catch (err) {
    next(err);
  }
});

// Create Mongoose-based borrowing (Task 5 validation check)
app.post('/api/v1/db/borrow', async (req, res, next) => {
  try {
    const { email, isbn, borrowDate, returnDate, status } = req.body;

    // Find Member by email
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found with that email." });
    }

    // Find Book by isbn
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found with that ISBN." });
    }

    // Create borrowing
    const newBorrowing = new Borrowing({
      memberId: member._id,
      bookId: book._id,
      borrowDate,
      returnDate,
      status // will default to 'borrowed' if undefined
    });

    const savedRecord = await newBorrowing.save();

    // Populate and return
    const populated = await Borrowing.findById(savedRecord._id)
      .populate('memberId', 'name email department')
      .populate('bookId', 'title author isbn');

    res.status(201).json({
      success: true,
      data: populated
    });
  } catch (err) {
    // Handle Mongoose validation or duplicate errors cleanly
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        errorType: 'ValidationError',
        message: err.message,
        errors: Object.keys(err.errors).reduce((acc, key) => {
          acc[key] = err.errors[key].message;
          return acc;
        }, {})
      });
    }
    next(err);
  }
});

// Route to trigger and demonstrate validation failures (Task 5 Requirement)
app.get('/api/v1/db/test-error', async (req, res, next) => {
  try {
    const testType = req.query.type;

    if (testType === 'missing-book-fields') {
      // Trigger validation failure for Book model (missing title, author, category, isbn)
      const invalidBook = new Book({});
      await invalidBook.save();
    } else if (testType === 'missing-member-name') {
      // Trigger validation failure for Member model (missing name, email, department)
      const invalidMember = new Member({
        email: "test@example.com",
        department: "Math"
      });
      await invalidMember.save();
    } else if (testType === 'invalid-borrowing-status') {
      // Trigger validation failure for Borrowing (invalid enum status)
      // We will create temporary valid IDs to check the status enum validation specifically
      const dummyId1 = new mongoose.Types.ObjectId();
      const dummyId2 = new mongoose.Types.ObjectId();

      const invalidBorrowing = new Borrowing({
        memberId: dummyId1,
        bookId: dummyId2,
        borrowDate: new Date(),
        returnDate: new Date(),
        status: "lost" // Invalid status, must be borrowed, returned, or overdue
      });
      await invalidBorrowing.save();
    } else {
      return res.status(400).json({
        success: false,
        message: "Provide a query param 'type' with values: 'missing-book-fields', 'missing-member-name', or 'invalid-borrowing-status'"
      });
    }
  } catch (err) {
    // Return structured validation failure JSON response (Task 5 Requirement)
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        errorType: 'ValidationError',
        message: 'Mongoose schema validation failed.',
        errors: Object.keys(err.errors).reduce((acc, key) => {
          acc[key] = err.errors[key].message;
          return acc;
        }, {})
      });
    }
    next(err);
  }
});

// ==========================================
// Error Handling Middleware (Last globally)
// ==========================================
app.use(errorHandler);

// ==========================================
// Connect MongoDB & Start Server
// ==========================================
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.warn("WARNING: MONGO_URI env variable is missing. Database operations will fail.");
  // Start server anyway so mock APIs can still run (Task 3 & 4)
  app.listen(PORT, () => {
    console.log(`Backend server started on port ${PORT} (WITHOUT database connection)`);
  });
} else {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB successfully!");
      app.listen(PORT, () => {
        console.log(`Backend server started on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err.message);
      // Start server anyway so mock APIs can still run
      app.listen(PORT, () => {
        console.log(`Backend server started on port ${PORT} (Database connection failed)`);
      });
    });
}
