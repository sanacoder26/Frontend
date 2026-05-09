# MERN Authentication Frontend

A complete React frontend for a MERN Authentication System with Login, Signup, Protected Routes, JWT Authentication, and React Router DOM.

---

##  Features

- User Signup
- User Login
- JWT Token Authentication
- Protected Home Route
- Logout Functionality
- Store Token in localStorage
- Responsive Design
- React Router DOM Navigation
- Axios API Integration
- Clean & Simple UI

---

## 🛠 Tech Stack

- React.js
- React Router DOM
- Axios
- CSS

---

## 🔐 Authentication Flow

### Signup

User enters:

- Name
- Email
- Password

Data sent to backend API.

---

### Login

- User logs in using email & password
- JWT token received from backend
- Token stored in localStorage

---

### Protected Route

- Home page only accessible if token exists
- Otherwise redirects to Login page

---

### Logout

- Removes token from localStorage
- Redirects user to Login page

---

## 🖥 Pages

### Signup Page

- Register new account
- Redirect to login after successful signup

---

### Login Page

- Login existing user
- Save JWT token

---

### Home Page

- Protected route
- Displays:

```bash
Welcome [User Name]
```

- Logout button included

---

## 📱 Responsive Design

- Fully responsive layout
- Centered forms
- Simple clean interface

---

## ⚙ Dependencies

Install required packages:

```bash
npm install react-router-dom axios
```

---

##  Preview Features

✔ Signup Form  
✔ Login Form  
✔ JWT Authentication  
✔ Protected Routes  
✔ Logout System  
✔ Axios API Calls

---

## 👩‍💻 Author

**SanaCoder**

Developed using React & MERN Stack.