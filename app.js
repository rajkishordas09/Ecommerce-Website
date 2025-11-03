const express = require('express');
const app = express();
const Products = require("./Routers/ProductRouter")
const signup = require('./Routers/authRouter');
const cartRouter = require('./Routers/cartRouter');
const orderRouter = require('./Routers/orderRouter')
require("./db")


app.use(express.json())

app.use(signup)
app.use(Products)
app.use(cartRouter)
app.use(orderRouter)



const port = 3001;
app.listen(port, () => console.log(`app is run at http://localhost:${port}`))