
---

# **Secure Token-Based Authentication with JWT in Node.js**

This project implements secure authentication using **JWT (JSON Web Tokens)** in **Node.js**. It includes features like role-based access control, middleware for permission verification, and route protection. The project is designed to provide a robust and scalable solution for managing authentication in modern web applications.

---

## **Features**

- **Secure Authentication**: Token-based authentication using JWT.
- **Role Management**: Middleware to handle access control based on user roles (`admin`, `user`, `fournisseur`).
- **Route Protection**: Restrict access to certain routes based on user roles.
- **Error Handling**: Comprehensive error messages for missing or invalid tokens.
- **Ready-to-Use Examples**: Includes sample endpoints for testing.
- **Postman Guide**: Easy-to-follow instructions for testing APIs with Postman.

---

## **Installation**

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   ```

2. Navigate to the project directory:  
   ```bash
   cd your-repository-name
   ```

3. Install dependencies:  
   ```bash
   npm install
   ```

4. Set up environment variables:  
   Create a `.env` file in the root directory and add the following:  
   ```env
   PORT=3000
   JWT_KEY=your_secret_key
   ```

5. Start the server:  
   ```bash
   npm start
   ```

---

## **Usage**

### **Endpoints**

1. **User Authentication**
   - **POST** `/api/users/login`: Authenticate user and receive a token.
   
2. **Protected Routes**
   - **GET** `/api/admin-only`: Access restricted to users with the `admin` role.
   - **GET** `/api/user-only`: Access restricted to users with the `user` role.
   - **GET** `/api/fournisseur-only`: Access restricted to users with the `fournisseur` role.

3. **Token Middleware**
   - Verifies the validity of the JWT token in the `Authorization` header.
   - Decodes user information and checks role-based access.

---

## **Testing with Postman**

### **1. Login and Obtain Token**

- **Endpoint**: `POST /api/users/login`  
- **Headers**:  
  - `Content-Type: application/json`  
- **Body (JSON)**:  
  ```json
  {
    "login": "your_login",
    "pwd": "your_password"
  }
  ```

- **Response**:  
  ```json
  {
    "status": "Succès",
    "message": "Connexion réussie",
    "token": "your_jwt_token"
  }
  ```

### **2. Access Protected Routes**

- **Endpoint Example**: `GET /api/admin-only`  
- **Headers**:  
  - `Authorization: Bearer your_jwt_token`  
- **Response**:  
  ```json
  {
    "status": "Succès",
    "data": "Admin-only content"
  }
  ```

---

## **Project Structure**

```
├── config/
│   └── dbConnect.js          # Database connection configuration
├── controllers/
│   └── userController.js     # User-related logic and endpoints
├── middleware/
│   └── verifyRole.js         # Role-based middleware for route protection
├── models/
│   └── User.js               # Mongoose schema for users
├── routes/
│   └── userRoutes.js         # User-related routes
├── .env                      # Environment variables
├── app.js                    # Main application entry point
└── README.md                 # Project documentation
```

---

## **Technologies Used**

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **Mongoose**: MongoDB ODM for data modeling.
- **JWT (jsonwebtoken)**: Token-based authentication.
- **bcrypt**: Password hashing for secure storage.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m 'Add your feature description'
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

