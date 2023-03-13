import { Router } from "express";
const routes = Router()

routes.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        isRegister: true,
    })
})


routes.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        isLogin: true,
    })
})

routes.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect("/")
})
routes.post('/register', (req, res) => {
    console.log(req.body);
    res.redirect("/")
})


export default routes