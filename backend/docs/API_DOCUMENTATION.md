#  API Documentation

## Postman Collection

The complete API documentation is available in the Postman collection file: `Store_Rating_System.postman_collection.json`

### Import in Postman
1. Open Postman
2. Click **Import** button
3. Select the file: `Store_Rating_System.postman_collection.json`
4. Collection will be imported with all endpoints

### Environment Setup
Create a new environment in Postman with these variables:

| Variable    | Value                   | Description              |
|-------------|-------------------------|--------------------------|
| `base_url`  | `http://localhost:5000` | Backend server URL       |
| `userToken` | (auto-set after login)  | JWT authentication token |
| `adminToken`| (auto-set after login)  | JWT authentication token |

### API Base URL
http://localhost:5000/api

### Authentication
Most endpoints require JWT token. After login:
1. Token is returned in response
2. Add to environment variable: `token`
3. Use in headers: `Authorization: Bearer {{token}}`


## API Endpoints Overview

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint           | Description       | Auth Required |
|--------|--------------------|-------------------|---------------|
| POST   | `/signup`          | Register new user | No            |
| POST   | `/login`           | User login        | No            |
| POST   | `/change-password` | Change password   | Yes           |

### 👨‍💼 Admin (`/api/admin`)

| Method | Endpoint     | Description         | Auth Required |
|--------|--------------|---------------------|---------------|
| GET    | `/dashboard` | Get dashboard stats | Admin         |
| POST   | `/users`     | Add new user        | Admin         |
| POST   | `/stores`    | Add new store       | Admin         |
| GET    | `/stores`    | Get all stores      | Admin         |
| GET    | `/users`     | Get all users       | Admin         |
| GET    | `/users/:id` | Get user details    | Admin         |

### 👤 User (`/api/user`)

| Method | Endpoint  | Description                 | Auth Required |
|--------|-----------|-----------------------------|---------------|
| GET    | `/stores` | Get all stores with ratings | User          |
| POST   | `/ratings`| Submit or update rating     | User          |

### 🏪 Store Owner (`/api/store`)

| Method | Endpoint     | Description         | Auth Required |
|--------|--------------|---------------------|---------------|
| GET    | `/dashboard` | Get store dashboard | Store Owner   |


## Testing Instructions

### Test Admin Flow
1. Login as admin: 
2. Get dashboard stats
3. Add a new store
4. View all stores
5. View all users

### Test User Flow
1. Signup as new user
2. Login with credentials
3. View stores
4. Submit rating for a store
5. Update rating

### Test Store Owner Flow
1. Login as store owner: 
2. View dashboard
3. See average rating
4. View list of users who rated

---

## Rate Limiting

Currently no rate limiting is implemented. For production:
- Recommended: 100 requests per 15 minutes per IP
- Authentication endpoints: 5 login attempts per 15 minutes

---

## Notes

- All timestamps are in UTC
- Token expires after 24 hours

