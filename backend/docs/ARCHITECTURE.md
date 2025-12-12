backend/
│
├── server.js -----------------> App entry point (Express startup)
│
├── config/
│   └── db.js -----------------> Database connection
│
├── middleware/
│   └── auth.js ---------------> JWT verification middleware
│
├── routes/
│   ├── auth.js ---------------> /api/auth (Login/Signup)
│   ├── admin.js --------------> /api/admin (User & Store mgmt)
│   ├── user.js ---------------> /api/user (Rating actions)
│   └── store.js --------------> /api/store (Store CRUD)
│
├── controllers/
│   ├── authController.js -----> Handles authentication logic
│   ├── adminController.js ----> Admin operations
│   ├── userController.js -----> User operations
│   └── storeController.js ----> Store-related operations
│
└── validators/
    └── validators.js ---------> Input validation rules


frontend/
│
└── src/
    ├── components/
    │   ├── Admin/
    │   │   ├── AdminDashboard.js
    │   │   ├── AddUser.js
    │   │   ├── StoreList.js
    │   │   └── UserList.js
    │   │
    │   ├── User/
    │   │   ├── UserDashboard.js
    │   │   ├── StoreListUser.js
    │   │   └── ChangePassword.js
    │   │
    │   ├── Store/
    │   │   ├── StoreDashboard.js
    │   │   └── RatingsList.js
    │   │
    │   ├── Auth/
    │   │   ├── Login.js
    │   │   └── Signup.js
    │   │
    │   └── Common/
    │       ├── Navbar.js
    │       └── PrivateRoute.js (Protected Routes using JWT)
    │
    ├── services/
    │   └── api.js ------------> Axios instance + API calls
    │
    ├── utils/
    │   └── validation.js -----> Frontend validation
    │
    ├── App.js ----------------> Routing configuration
    ├── App.css
    └── index.js --------------> React entry point
