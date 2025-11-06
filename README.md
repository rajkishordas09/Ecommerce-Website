# 🛒 E-Commerce Backend (Node.js + Express + MongoDB)

This is a backend project for an E-Commerce platform built using **Node.js**, **Express.js**, and **MongoDB**.  
It includes user authentication, product management, cart features, and order handling with **Role-Based Access (User/Admin)**.

---

## 📂 Project Structure

E-COMMERSE WEBSITE
│── Middleware
│ ├── authAdminOnly.js # Only Admin can access
│ ├── authN.js # Authentication Middleware (JWT)
│ └── authUserAdmin.js # Both Admin & User can access
│
│── Model
│ ├── CartModel.js
│ ├── ProductModel.js
│ └── SignupModel.js
│
│── Routers
│ ├── authRouter.js # Signup/Login Routes
│ ├── cartRouter.js # Cart Operations
│ ├── orderRouter.js # Order APIs
│ └── ProductRouter.js # Product CRUD APIs
│
├── app.js # App Entry Point
├── db.js # MongoDB Connection
├── package.json
└── README.md

yaml
Copy code

---

## 🚀 Features

✅ User Signup & Login using JWT Authentication  
✅ Role-Based Authorization (**Admin**, **User**)  
✅ Password Encryption using Bcrypt  
✅ Product: Create, Read, Update, Delete (CRUD) (Admin Only)  
✅ Add to Cart, View Cart, Remove from Cart  
✅ Place Orders & View Orders (User/Admin with access control)  
✅ Protected Routes using Middleware

---

## 🛠️ Tech Stack

| Technology         | Purpose                    |
| ------------------ | -------------------------- |
| Node.js            | Server Runtime Environment |
| Express.js         | Backend Framework          |
| MongoDB + Mongoose | Database & ODM             |
| JWT                | Authentication             |
| Bcrypt.js          | Password Hashing           |

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Setup Environment Variables
Create a .env file in the project root:

ini
Copy code
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
4️⃣ Start the Server
bash
Copy code
npm start
Server will run at:
http://localhost:5000

🔐 API Endpoints
🔸 Auth Routes
Method	Endpoint	Description
POST	/signup	User Registration
POST	/login	User Login

🛍️ Product Routes
Method	Endpoint	Description
GET	/products	Get All Products
GET	/products/name/:name	Get All Products by name
GET	/products/name/:productId	Get a Products by productId
POST	/product	Add Product (Admin Only)
PUT	/products/update/:id	Update Product (Admin Only)
DELETE	/products/delete/:id	Delete Product (Admin Only)

🛒 Cart Routes
Method	Endpoint	Description
POST	/cart/add/:productId
GET	/cart	View User Cart
DELETE	/cart/delete/:productId	Remove Item from Cart

📦 Order Routes
Method	Endpoint	Description
GET	/order
(View Orders)

🧱 Folder Purpose Summary
Folder/File	Description
Middleware	Auth & access control middleware files
Model	Mongoose schemas for collections
Routers	Route handlers for API modules
db.js	MongoDB connection setup
app.js	Main server with middleware + routes

🤝 Contribution
Contributions are welcome!
For major changes, please open an issue first to discuss what you would like to modify.

✨ Author
Your Name — Raj kishor Das
email : dasrajkishorraj09@gmail.com
```
