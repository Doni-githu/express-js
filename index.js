import express from "express";
import { create } from "express-handlebars"
import mongoose from "mongoose";
import flash from "connect-flash"
import session from "express-session"
import * as dotenv from "dotenv";
import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"
import varMiddleware from "./middleware/var.js"
import inHave from "./middleware/have.js"
import cookieParser from "cookie-parser";
import hbsHandler from "./utils/index.js";
import userMiddleware from "./middleware/user.js";
dotenv.config()
const app = express()
const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: hbsHandler,
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: "doni", resave: false, saveUninitialized: false }))
app.use(flash())
app.use(cookieParser())
app.use(varMiddleware)
app.use(userMiddleware)
app.use(inHave)


app.use(AuthRoutes)
app.use(ProductsRoutes)


const startApp = () => {
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, })
        const PORT = process.env.PORT ?? 5000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startApp()