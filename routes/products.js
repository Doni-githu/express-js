import { Router } from "express";
import Products from "../models/Products.js"
import authMiddleware from "../middleware/auth.js"
import userMiddleware from "../middleware/user.js"
const routes = Router()

routes.get('/', async (req, res) => {
    const products = await Products.find().lean()
    res.render('index', {
        title: 'Boom Shop',
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
    })
})

routes.get('/products', async (req, res) => {
    const user = req.userId ? req.userId.toString() : null
    const MyProducts = await Products.find({ user }).populate('user').lean()


    res.render('products', {
        title: 'Products | Doni',
        isTrue: true,
        pro: MyProducts
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



routes.post('/add-products', userMiddleware, async (req, res) => {
    const { title, description, image, price } = req.body
    if (!title || !description || !image || !price) {
        req.flash("ErrorAdd", "All fiels is required")
        res.redirect('/add')
        return;
    }
    await Products.create({ ...req.body, user: req.userId })
    res.redirect('/')
})
routes.get('/product/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null
    const product = await Products.findById(id).populate('user').lean()
    res.render('product', {
        product: product
    })
})

routes.get('/edit/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null
    const product = await Products.findById(id).populate('user').lean()
    res.render('edit', {
        product: product,
        ErrorEdit: req.flash('ErrorEdit')
    })
})

routes.post('/edit-product/:id', async (req, res) => {
    const { title, description, image, price } = req.body
    const id = req.params.id
    if (!title || !description || !image || !price) {
        req.flash("ErrorEdit", "All fiels is required")
        res.redirect(`/edit/${id}`)
        return;
    }

    const product = await Products.findByIdAndUpdate(id, req.body, { new: true })
    res.redirect('/products')
})

routes.post('/delete-product/:id', async (req, res) => {
    const id = req.params.id
    await Products.findByIdAndRemove(id)
    res.redirect('/')
})
routes.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    const product = await Products.findById(id).populate('user').lean()
    res.render('delete', {
        product: product
    })
})

export default routes