// Här ska vi definiera vår server! Men vi ska inte starta den
// (alltså app.listen(port, ()=>{}), har vi inte i denna fil, utan i index.js)
const express = require('express')

const app = express()
const port = process.env.PORT || 8080
const productItem = require('../model/product')

const ROUTE = {
    main: '/',
    product: '/product',
    gallery: '/gallery',
    addProduct: '/add-product'
}

const VIEW = {
    gallery: 'gallery',
    product: 'product',
    main: 'main'
}

if (process.env.NODE_ENV == 'development') {
    const sassMiddleware = require('node-sass-middleware')
    app.use(sassMiddleware({ // tell sassMiddleware where src file and dest directory is
        src: 'sass',
        dest: 'public',
        // debug: true, // för att skriva ut data till konsollen
        outputStyle: 'compressed'
    }))
}

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

// ------------------  Routs  -------------------//
app.get(ROUTE.gallery, async (req, res) => {
    const productList = await productItem.find()
    res.status(200).render(VIEW.gallery, { productList })
})

app.get(ROUTE.product, (req, res) => {
    res.status(200).render(VIEW.product, {})
})

app.post(ROUTE.addProduct, (req, res) => {
    // Skapa ny produkt
    new productItem({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imgUrl: req.body.imgUrl
    }).save() // och spara till databasen
    //skicka vidare till rout 
    res.status(200).redirect(ROUTE.gallery)
})

app.get(ROUTE.main, (req, res) => {
    res.status(200).render(VIEW.main, {})
})

module.exports = { app, port, express }