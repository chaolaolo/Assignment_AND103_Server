
const express = require('express');
const { default: mongoose } = require('mongoose');
const productModel = require('./model/productModel');
const COMMON = require('./COMMON');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('this is api of mobile ')
})

const uri = COMMON.uri;

router.get('/listProducts', async (req, res) => {
    await mongoose.connect(uri);

    let products = await productModel.find();
    console.log(products);

    res.send(products);
})

router.post('/addProduct', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const newProduct = new productModel(req.body);
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
