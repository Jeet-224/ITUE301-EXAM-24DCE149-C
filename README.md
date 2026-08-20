# Library Book Management System

An academic project that digitizes basic information about library books, members, and borrowing logs using React (Vite) + Express.js + MongoDB.

---

## 1. Project Name
Library Book Management System

---

## 2. Frontend Setup and Run Command

```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

---

## 3. Backend Setup and Run Command

```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:5000`

---

## 4. MongoDB Setup

Ensure MongoDB is running locally on `mongodb://localhost:27017` or update the `MONGO_URI` in the `.env` file with your MongoDB connection string (local or MongoDB Atlas).

---

## 5. Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=mongodb://localhost:27017/itue301_library_db
PORT=5000
```

Refer to `.env.example` for the template.
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
