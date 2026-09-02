# LUXE E-Commerce

A full-stack, production-ready e-commerce application built with the PERN-like stack (MySQL instead of PostgreSQL).

## 🚀 Tech Stack

### Frontend
- **Framework:** React + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API (AuthContext, CartContext)
- **HTTP Client:** Axios

### Backend
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs
- **CORS:** Enabled

## ✨ Features

- **Authentication:** Secure JWT-based user registration and login.
- **Product Catalog:** View products, filter by category, sort by price/rating, and search.
- **Shopping Cart:** Add products, update quantities, and calculate totals (tax, shipping, subtotal) securely on the backend.
- **Checkout & Payments:** Secure checkout flow with a mock payment gateway integration.
- **Order Management:** Atomic order creation using SQL transactions to prevent race conditions and ensure data integrity (deducts stock, records historical prices).
- **User Dashboard:** View account details and track order history.
- **Wishlist:** Save favorite items for later.
- **Responsive Design:** Fully responsive UI tailored for mobile, tablet, and desktop viewing.

## 📂 Project Structure

```
ecommerce-app/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route logic (Auth, Products, Cart, Orders, etc.)
│   │   ├── middleware/       # Custom middleware (Auth protection, Error handling)
│   │   ├── models/           # Sequelize Models (User, Product, Cart, Order, etc.)
│   │   ├── routes/           # API Endpoints
│   │   ├── seeders/          # Database seed scripts
│   │   └── app.js            # Express app setup
│   ├── server.js             # Entry point
│   └── .env                  # Environment variables
└── frontend/                 # React + Vite Client
    ├── src/
    │   ├── components/       # Reusable UI components (Navbar, Footer, ProductCard)
    │   ├── context/          # React Context providers (Auth, Cart)
    │   ├── hooks/            # Custom React hooks
    │   ├── pages/            # Page components (Home, Cart, Checkout, Profile, etc.)
    │   ├── services/         # Axios API client setup
    │   ├── App.jsx           # Main App routing
    │   └── main.jsx          # React entry point
    └── .env                  # Environment variables
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server running locally or remotely.

### 1. Database Setup
Create a new MySQL database named `ecommerce_db`.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file with your database credentials and a secure JWT secret:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce_db
   JWT_SECRET=your_super_secret_key
   ```
4. Seed the database with sample products and categories:
   ```bash
   node src/seeders/seedDatabase.js
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start at `http://localhost:5173` and automatically communicate with the backend at `http://localhost:5000`.

## 📜 License
This project is open-source and available under the MIT License.
