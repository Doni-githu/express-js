import { Router } from "express";
const routes = Router()

routes.get('/', (req, res) => {
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

routes.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add Products',
        isAdd: true,
    })
})


export default routes