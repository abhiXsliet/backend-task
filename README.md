# Authentication API using Express and MongoDB

This repository contains an authentication API built using Express.js and MongoDB, enabling user registration, login, and access control using JSON Web Tokens (JWT).

## Features

1. **Authentication APIs:**
   - **Signup:** Register a new user with name, email, password, and role (e.g., Student).
     - **Endpoint:** `POST http://localhost:4000/api/v1/signup`
     - **Example Request Body:**
       ```json
       {
           "name": "Abhi",
           "email": "Abhi@gmail.com",
           "password": "123456",
           "role": "Student"
       }
       ```

   - **Login:** Authenticate a user with email and password.
     - **Endpoint:** `POST http://localhost:4000/api/v1/login`
     - **Example Request Body:**
       ```json
       {
           "email": "abhishek-admin@gmail.com",
           "password": "abhishekPassword"
       }
       ```

2. **Protected Routes:** 
   - Utilizes middleware (`authMiddleware`) to protect routes based on user roles.
     - **Example Protected Routes:**
       - `GET http://localhost:4000/api/v1/test`
       - `GET http://localhost:4000/api/v1/student/`
       - `GET http://localhost:4000/api/v1/admin/`
   
3. **JWT Token Usage:**
   - JWT tokens are used for authentication and authorization across routes.
     - Example tokens are provided for testing different user roles (`student`, `admin`).

## Routes (Tested with Postman)
- Watch all [SCREENSHOTS](/Screenshots/) for Testing result of Api's 

- **Signup:** `POST http://localhost:4000/api/v1/signup`
- **Login:** `POST http://localhost:4000/api/v1/login`
- **Test Route (Protected):** `GET http://localhost:4000/api/v1/test`
- **Student Route (Protected):** `GET http://localhost:4000/api/v1/student/`
- **Admin Route (Protected):** `GET http://localhost:4000/api/v1/admin/`

## Token Handling

The API handles JWT tokens from various sources (cookies, body, or headers) to authenticate users. Example token extraction:
```javascript
// Extract JWT Token from either cookie, body, or header
const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
```

## Setup

1. **Clone Repository:**
   ```bash
   git clone https://github.com/abhixsliet/backend-task.git
   cd backend-task
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Environment Variables:**
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     ```plaintext
     PORT=4000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - **Note:** Ensure to replace `your_mongodb_connection_string` with your MongoDB cluster URI. If you do not have one, follow these steps:
     - Sign up or log in to MongoDB Atlas (https://www.mongodb.com/cloud/atlas).
     - Create a new cluster (or use an existing one).
     - Obtain the connection string by navigating to "Connect" and selecting "Connect your application".

4. **Start the Server:**
   ```bash
   npm run dev
   ```

## Dependencies

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment
- `jsonwebtoken`: JSON Web Token implementation for Node.js
- `bcryptjs`: Library to hash passwords

Please adjust the setup and configuration based on your specific environment and requirements. If you have any questions or need further assistance, feel free to reach out!

## License

This project is licensed under the [MIT License](LICENSE).
