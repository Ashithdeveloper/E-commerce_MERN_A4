# 🛍️ Full-Stack MERN E-Commerce Platform

A production-ready, full-stack E-Commerce application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). This repository is organized as a monorepo featuring an intuitive **Customer Storefront**, a comprehensive **Admin & Staff Management Dashboard**, and a scalable **RESTful API Backend** with Cloudinary image management.

---

## 📑 Table of Contents

- [Project Architecture](#-project-architecture)
- [Key Features](#-key-features)
  - [Customer Storefront](#1-customer-storefront-frontend)
  - [Admin & Staff Portal](#2-admin--staff-portal-admin)
  - [Backend REST API](#3-backend-rest-api-backend)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Admin Role-Based Access Control (RBAC)](#-admin-role-based-access-control-rbac)
- [License](#-license)

---

## 🏗️ Project Architecture

```
                       ┌───────────────────────────────┐
                       │       MongoDB Database        │
                       └──────────────┬────────────────┘
                                      │
                       ┌──────────────┴────────────────┐
                       │     Express / Node.js API     │
                       │          (Backend)            │
                       └──────┬─────────────────┬──────┘
                              │                 │
              ┌───────────────┴────┐       ┌────┴────────────────┐
              │ Customer Front-End │       │ Admin & Staff Panel │
              │     (Storefront)   │       │     (Dashboard)     │
              └────────────────────┘       └─────────────────────┘
```

---

## ✨ Key Features

### 1. 🛒 Customer Storefront (`/frontend`)
- **Interactive Product Catalog**: Real-time category filtering (Men, Women, Kids), subcategories (Topwear, Bottomwear, Winterwear), and price sorting.
- **Product Details & Gallery**: Multi-angle image preview, size selection, dynamic availability status, and related product recommendations.
- **Shopping Cart & Checkout**:
  - Add/remove items with specific sizes.
  - Live subtotal and shipping cost calculation.
  - Multi-method checkout (Cash on Delivery / Online).
- **User Authentication**: Secure JWT-based User Signup, Login, and persistent session management.
- **Order Tracking**: Detailed user order history with item breakdown, order status, and address info.
- **Responsive Modern UI**: Styled with Tailwind CSS v4 and dynamic toast notifications.

### 2. 🛡️ Admin & Staff Portal (`/admin`)
- **Role-Based Access Control (RBAC)**:
  - **Super Admin**: Complete control, including full staff management and all operational permissions.
  - **Staff Members**: Configurable granular permissions (e.g., Manage Products, View/Update Orders, Manage Staff).
- **Product Management**:
  - Add new products with multi-image Cloudinary upload, sizes, pricing, and "Bestseller" flags.
  - List, inspect, and delete products in real time.
- **Order Fulfillment**:
  - Live order feed displaying payment status, delivery address, ordered items, and customer details.
  - Update order workflow status (`Order Placed`, `Packing`, `Shipped`, `Out for delivery`, `Delivered`).
- **Staff Administration**:
  - Invite and register staff accounts.
  - Assign and modify custom permissions.
  - Activate/Deactivate staff members.
- **Testing & Review Helper**: Fast one-click auto-fill credentials for quick review and development.

### 3. ⚙️ Backend REST API (`/backend`)
- **RESTful API Architecture**: Organized using MVC pattern with Express Routers and Controllers.
- **Cloudinary Integration**: Direct image upload and optimization using Multer and Cloudinary Storage.
- **Robust Authentication & Security**:
  - Password hashing with `bcryptjs`.
  - JSON Web Tokens (JWT) for stateless authentication.
  - Admin & Staff permission verification middlewares.
  - Cross-Origin Resource Sharing (CORS) configured.
- **Database Schemas**: Well-defined Mongoose models for Users, Admins/Staff, Products, and Orders.

---

## 💻 Technology Stack

| Layer | Technologies |
|---|---|
| **Storefront (Frontend)** | React 19, Vite, Tailwind CSS v4, React Router DOM 7, Axios, React Toastify |
| **Admin Panel** | React 19, Vite, Redux Toolkit, Tailwind CSS v4, React Router DOM 7, React Icons |
| **Backend (Server)** | Node.js, Express.js (v5), Mongoose (v8), JSON Web Token (JWT), Multer, Cloudinary SDK |
| **Database** | MongoDB Atlas / Local MongoDB instance |
| **Media Storage** | Cloudinary |

---

## 📁 Folder Structure

```text
MERN E-commerce/
├── backend/
│   ├── controller/          # Route controller logic (auth, product, cart, order)
│   ├── db/                  # MongoDB database connection configuration
│   ├── middleWare/          # Auth & Admin/Staff RBAC middlewares
│   ├── model/               # Mongoose data schemas (admin, auth, order, product)
│   ├── Router/              # Express API route declarations
│   ├── cloudinary.js        # Cloudinary and Multer storage configuration
│   ├── generateToken.js     # JWT token creation utilities
│   ├── index.js             # Express app entry point
│   ├── package.json
│   └── .env                 # Server environment variables
│
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static icons, logos, and illustrations
│   │   ├── component/       # Reusable UI components (Navbar, Footer, SearchBar, etc.)
│   │   ├── context/         # Shop context provider for global state management
│   │   ├── pages/           # Pages (Home, Collection, Product, Cart, PlaceOrder, Orders, Login)
│   │   ├── config.js        # API Base URL configuration
│   │   ├── App.jsx          # Route configuration
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── admin/
    ├── src/
    │   ├── component/
    │   │   ├── Login/       # Admin and Staff login screen
    │   │   ├── AddProduct.jsx
    │   │   ├── ListProduct.jsx
    │   │   ├── OrderList.jsx
    │   │   ├── AdminManagement.jsx # Staff & RBAC permissions management
    │   │   ├── Navbar.jsx
    │   │   └── sideBar.jsx
    │   ├── Redux/           # Redux store and slices
    │   ├── config.js        # Admin API Base URL configuration
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 🔐 Environment Variables

Create a `.env` file in the **`backend/`** directory with the following configuration:

```env
# Server Configuration
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary Credentials (for product image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Default Super Admin Credentials (Optional / Seed)
ADMIN_EMAIL=admin@ecommerce.com
ADMIN_PASSWORD=your_superadmin_password
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18.x or later recommended)
- **npm** or **yarn**
- **MongoDB** (Local or MongoDB Atlas connection string)
- **Cloudinary Account** (Free tier for image uploads)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Ashithdeveloper/E-commerce_MERN_A4.git
cd "MERN E-commerce"
```

---

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file as shown above

# Start backend development server
npm run dev
```
> The API server will run on `http://localhost:4000`.

---

### Step 3: Admin Dashboard Setup
Open a new terminal window:
```bash
# Navigate to admin directory
cd admin

# Install dependencies
npm install

# Start admin development server
npm run dev
```
> The Admin panel will run on `http://localhost:5174` (or Vite's assigned port).

---

### Step 4: Customer Frontend Setup
Open another terminal window:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start storefront development server
npm run dev
```
> The Customer Storefront will run on `http://localhost:5173`.

---

## 📡 API Endpoints Reference

### 🔐 Authentication & Staff (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new customer | Public |
| `POST` | `/api/auth/login` | Login existing customer | Public |
| `POST` | `/api/auth/admin` | Login SuperAdmin or Staff member | Public |
| `POST` | `/api/auth/create-staff` | Create a new Staff member | SuperAdmin / Staff with permission |
| `GET` | `/api/auth/staff-list` | Get all registered staff members | SuperAdmin / Staff with permission |
| `PUT` | `/api/auth/update-staff/:id` | Update staff details & permissions | SuperAdmin |
| `DELETE`| `/api/auth/delete-staff/:id` | Remove a staff member | SuperAdmin |

### 📦 Products (`/api/product`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/product/list` | Fetch all products | Public |
| `POST` | `/api/product/add` | Add product with images | Admin / Staff with permission |
| `POST` | `/api/product/remove` | Delete a product | Admin / Staff with permission |
| `POST` | `/api/product/single` | Get single product details | Public |

### 🛒 Cart (`/api/cart`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/cart/add` | Add an item to user cart | Authenticated User |
| `POST` | `/api/cart/update` | Update quantity of a cart item | Authenticated User |
| `POST` | `/api/cart/get` | Retrieve user cart data | Authenticated User |

### 📋 Orders (`/api/order`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/order/place` | Place an order (Cash on Delivery) | Authenticated User |
| `POST` | `/api/order/userorders` | Get orders for logged-in user | Authenticated User |
| `POST` | `/api/order/list` | Get all orders across the platform | Admin / Staff with permission |
| `POST` | `/api/order/status` | Update delivery/payment status | Admin / Staff with permission |

---

## 👥 Admin Role-Based Access Control (RBAC)

The application incorporates a permission model:

| Capability | Super Admin | Staff (Full Permissions) | Staff (Custom Permissions) |
|---|:---:|:---:|:---:|
| Access Admin Portal | ✅ | ✅ | ✅ |
| Manage Products (Add/Edit/Delete) | ✅ | ✅ | Optional (`manage_products`) |
| Manage Orders (View/Update Status) | ✅ | ✅ | Optional (`manage_orders`) |
| View Staff List | ✅ | ✅ | Optional (`view_staff`) |
| Create/Edit Staff & Permissions | ✅ | ❌ | ❌ |
| Delete Staff Members | ✅ | ❌ | ❌ |

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
