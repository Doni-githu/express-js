import { Router } from "express";
import Product from "../models/products.js"
import authMiddleware from "../middleware/auth.js"
import user from "../middleware/user.js"
const routes = Router()

routes.get('/', async (req, res) => {
    res.render('index', {
        title: 'Boom Shop',
    })
})

routes.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | Doni',
        isTrue: true,
    })
})

routes.get('/add', authMiddleware, (req, res) => {
    if (!req.cookies.token) {
        res.redirect('/')
        return;
    }
    res.render('add', {
        title: 'Add Products',
        isAdd: true,
        ErrorAdd: req.flash('ErrorAdd')
    })
})

routes.post('/add-products', user, async (req, res) => {
    const { title, description, image, price } = req.body
    if (!title || !description || !image || !price) {
        req.flash("ErrorAdd", "All fiels is required")
        res.redirect('/add')
        return;
    }
    console.log(req.userId);
    console.log(req.body);
    // const product = await Product.create({ ...req.body, user: req.userId })
    res.redirect('/')
})

export default routes