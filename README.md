

##  Project Walkthrough (Loom Video)
**[PASTE YOUR LOOM VIDEO LINK HERE]**

---

## 🚀 Project Overview
This is a full-stack booking application built with:
* **Frontend:** React (Vite)
* **Backend:** Node.js, Express
* **Database:** MySQL (Sequelize ORM)

**Note:** As per assignment rules, no sensitive keys or URLs are hardcoded. You must set up environment variables to run this project.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
* Node.js installed
* MySQL installed and running

### 2. Database Setup
1.  Open your MySQL Workbench or Terminal.
2.  Create a database named `booking_db`:
    ```sql
    CREATE DATABASE booking_db;
    ```

### 3. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend/` folder and add the following:
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=YOUR_MYSQL_PASSWORD
    DB_NAME=booking_db
    DB_DIALECT=mysql
    ```
4.  Start the server:
    ```bash
    node server.js
    ```
    *The database tables will be created automatically via Sequelize Sync.*

### 4. Frontend Setup
1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the `frontend/` folder and add the following:
    ```env
    VITE_API_URL=http://localhost:5000/api/bookings
    ```
4.  Start the React app:
    ```bash
    npm run dev
    ```

---

##  Features
* Add, Edit, and Delete Bookings.
* Validation for dates and numeric fields.
* Responsive Table Layout.
* Data persistence using MySQL.
