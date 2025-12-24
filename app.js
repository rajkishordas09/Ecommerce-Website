const express = require('express');


// ✅ Load & validate env (Zod) 
require("./config/env.js");  //make sure to load env variables before anything else so make it top of the file

const app = express();
const Products = require("./Routers/ProductRouter")
const signup = require('./Routers/authRouter');
const cartRouter = require('./Routers/cartRouter');
const orderRouter = require('./Routers/orderRouter')


// require("./db")//for mongose connection


app.use(express.json())

app.use(signup)
app.use(Products)
app.use(cartRouter)
app.use(orderRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});