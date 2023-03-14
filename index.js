import express from "express";
import { engine, create } from "express-handlebars"
import mongoose from "mongoose";
import flash from "connect-flash"
import session from "express-session"
import * as dotenv from "dotenv";
import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"


dotenv.config()


const app = express()
const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs'
})




app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: "Donni", resave: false, saveUninitialized: false }))
app.use(flash())




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
        console.log(error)
    }
}

startApp()


// mongodb+srv://ddonierov96:<password>@doni.odgzc3z.mongodb.net/?retryWrites=true&w=majority