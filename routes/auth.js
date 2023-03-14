import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const routes = Router()

routes.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        isRegister: true,
        loginError: req.flash('loginError'),
    })
})


routes.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        isLogin: true,
        registerError: "Error"
    })
})



routes.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        req.flash("loginError", "All fields is required")
        res.redirect('/login')
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
        console.log("User not found")
        return;
    }

    const isPasswordEqual = await bcrypt.compare(password, existUser.password)
    if (!isPasswordEqual) {
        console.log("Password wrong")
        return;
    }

    res.redirect("/")
})
routes.post('/register', async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashPassword,
    }
    const user = await User.create(userData)
    console.log(user);
    res.redirect("/")
})


export default routes