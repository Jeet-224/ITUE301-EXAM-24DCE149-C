# Library Book Management System (Set B)

An academic project developed as part of the Practical Examination. It digitizes basic information about library books, members, and borrowing logs.

**Student Details:**
- **Roll Number:** 24DCE149
- **Batch:** B
- **Tech Stack:** React (Vite) + Express.js + MongoDB + Mongoose

---

## 🛠️ Project Structure
- `/frontend` - Vite React frontend containing component architecture, routing, form inputs, and API integrations.
- `/backend` - Express.js REST API with custom logger, validation models, and Mongoose database operations.

---

## ⚙️ Requirements & Environment Setup

Copy `.env.example` to `.env` in the root folder:

```bash
# Environment Variables (.env)
MONGO_URI=mongodb://127.0.0.1:27017/itue301_library_db
PORT=5000
```

---

## 🚀 Running the Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Express server:
   ```bash
   npm start
   ```
   *The backend will boot up, connect to MongoDB, and listen on port 5000.*

### 📡 API REST Endpoints
- **GET** `http://localhost:5000/api/v1/books` - Returns in-memory books catalog.
- **GET** `http://localhost:5000/api/v1/borrowings` - Returns borrowing logs.
- **POST** `http://localhost:5000/api/v1/borrowings` - Appends a borrowing log.
- **POST** `http://localhost:5000/api/v1/db/seed` - Seeds MongoDB with sample books and members.
- **POST** `http://localhost:5000/api/v1/db/borrow` - Inserts borrowing records in MongoDB.
- **GET** `http://localhost:5000/api/v1/db/test-error?type=<type>` - Triggers Mongoose schema validations.
  - Types: `missing-book-fields`, `missing-member-name`, `invalid-borrowing-status`.

---

## 💻 Running the Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch development server:
   ```bash
   npm run dev
   ```
   *The client application will run at http://localhost:5173/.*

---

## 🖨️ Generating the PDF Report

The PDF report can be compiled dynamically with your screenshots.

1. Capture these three screenshots:
   - **`screenshot1.png`**: The React app running in the browser (e.g. Catalog Page).
   - **`screenshot2.png`**: Postman/Thunder Client showing a successful API response (e.g. `GET /api/v1/books`).
   - **`screenshot3.png`**: MongoDB Compass displaying the seeded books/members or created borrowing log.
2. Save the screenshots in the **root directory** of this repository with names `screenshot1.png`, `screenshot2.png`, and `screenshot3.png`.
3. In the backend folder, run:
   ```bash
   npm run report
   ```
   This will automatically compile your details and embed the three images into the final submission file: **`24DCE149_SetB_Report.pdf`** in the root folder.
