import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateJWTTOKEN } from "../services/token.js";
import isHave from "../middleware/have.js"
const routes = Router()

routes.get('/register', isHave, (req, res) => {
    res.render('register', {
        title: 'Register',
        isRegister: true,
        registerError: req.flash('registerError'),
    })
})



routes.get('/login', isHave, (req, res) => {
    res.render('login', {
        title: 'Login',
        isLogin: true,
        loginError: req.flash('loginError'),
    })
})

routes.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        req.flash("loginError", "All fields is required")
        res.redirect('/login')
        return;
    }
    const existUser = await User.findOne({ email })
    if (!existUser) {
        req.flash("loginError", "User not found")
        res.redirect('/login')
        return;
    }
    const isPasswordEqual = await bcrypt.compare(password, existUser.password)
    if (!isPasswordEqual) {
        req.flash('loginError', 'Password wrong')
        res.redirect('/login')
        return
    }
    const token = generateJWTTOKEN(existUser._id)
    res.cookie("token", token, { httpOnly: true, secure: true })
    res.redirect("/")
})

routes.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    if (!firstname || !lastname || !email || !password) {
        req.flash("registerError", "All fields is required")
        res.redirect('/register')
        return;
    }

    const candidate = await User.findOne({ email })

    if (candidate) {
        req.flash("registerError", "Email taken")
        res.redirect('/register')
        return;
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashPassword,
    }
    const user = await User.create(userData)
    const token = generateJWTTOKEN(user._id)
    res.cookie("token", token, { httpOnly: true, secure: true })
    res.redirect("/")
})

routes.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

export default routes