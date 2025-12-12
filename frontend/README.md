# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## 🔌 API Documentation

### Postman Collection
Complete API documentation is available in Postman format.

**Location:** `docs/Store_Rating_System.postman_collection.json`

**Import Instructions:**
1. Open Postman
2. Click **Import** → **Upload Files**
3. Select the collection JSON file
4. Create environment with variables:
   - `base_url`: `http://localhost:5000`
   - `token`: (auto-populated after login)

**Detailed API Documentation:** See [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

###  API Reference


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
