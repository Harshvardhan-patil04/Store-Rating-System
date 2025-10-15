# 🏪 Store-Rating-System 

A full-stack web application that allows users to submit ratings for stores registered on the platform.  
Built using the **ReactJS (Frontend)**, **ExpressJS (Backend)**, and **MySQL (Database)** stack.  

The system supports **role-based access** for three types of users:  
1. System Administrator  
2. Normal User  
3. Store Owner  

Each user has specific functionalities, ensuring a secure and efficient store rating management system.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | ReactJS |
| **Backend** | ExpressJS |
| **Database** | MySQL |
| **Language** | JavaScript |
| **Version Control** | Git & GitHub |

---

## 🧩 Project Description

This web application provides a centralized platform where users can register, log in, and rate stores on a scale of 1–5.  
Each user has role-based access to specific features:

- **Normal Users** can browse and rate stores.  
- **Store Owners** can view ratings submitted for their stores.  
- **Administrators** can manage all stores and users through a dashboard.  

All data, including users, stores, and ratings, is stored securely in a MySQL database.

---

## 👥 User Roles and Functionalities

### 🧑‍💼 System Administrator
- Add new **stores**, **normal users**, and **admin users**.  
- Access dashboard displaying:
  - Total number of users  
  - Total number of stores  
  - Total number of ratings submitted  
- Add new users with details:
  - Name, Email, Password, Address  
- View and filter lists of:
  - **Stores:** Name, Email, Address, Rating  
  - **Users:** Name, Email, Address, Role  
- View user details including role and store rating (if store owner).  
- Can log out.

---

### 🙍 Normal User
- Can **sign up** and **log in** to the platform.  
- Signup fields: Name, Email, Address, Password.  
- Can **update password** after login.  
- Can view and search stores by **Name** or **Address**.  
- Store listing displays:
  - Store Name  
  - Address  
  - Overall Rating  
  - User’s Submitted Rating  
  - Option to submit or modify rating (1–5).  
- Can log out.

---

### 🧑‍🔧 Store Owner
- Can **log in** and **update password**.  
- Dashboard shows:
  - Users who submitted ratings for their store.  
  - Average store rating.  
- Can log out.

---

## 🧱 Form Validations

| Field | Validation |
|--------|-------------|
| **Name** | Minimum 20 characters, Maximum 60 characters |
| **Address** | Maximum 400 characters |
| **Password** | 8–16 characters, must include at least one uppercase letter and one special character |
| **Email** | Must follow standard email format |

---

## 📊 Additional Notes
- Tables support **sorting (ascending/descending)** for fields like Name, Email, etc.  
- **Database schema** follows normalization and referential integrity.  
- **Frontend and backend** follow best development practices.  

---

## 🏗️ Project Structure

store-rating-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── user.js
│   │   └── store.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── userController.js
│   │   └── storeController.js
│   ├── validators/
│   │   └── validators.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Admin/
    │   │   │   ├── AdminDashboard.js
    │   │   │   ├── AddUser.js
    │   │   │   ├── StoreList.js
    │   │   │   └── UserList.js
    │   │   ├── User/
    │   │   │   ├── UserDashboard.js
    │   │   │   ├── StoreListUser.js
    │   │   │   └── ChangePassword.js
    │   │   ├── Store/
    │   │   │   ├── StoreDashboard.js
    │   │   │   └── RatingsList.js
    │   │   ├── Auth/
    │   │   │   ├── Login.js
    │   │   │   └── Signup.js
    │   │   └── Common/
    │   │       ├── Navbar.js
    │   │       └── PrivateRoute.js
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   └── validation.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository

  git clone https://github.com/yourusername/store-rating-app.git
  cd store-rating-app
  
2️⃣ Setup Backend

  cd backend
  npm init -y
  npm install express mysql2 bcryptjs jsonwebtoken cors dotenv express-validator
  
  Create a .env file:
  PORT=5000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_password
  DB_NAME=store_rating_system
  JWT_SECRET=your_jwt_secret_key_here_change_in_production
  NODE_ENV=development
  
  Start the Server:
  npm start
  
3️⃣ Setup Frontend

  npx create-react-app frontend
  cd frontend
  npm install axios react-router-dom

  
