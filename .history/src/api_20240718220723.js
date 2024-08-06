
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
    // await mongoose.connect(uri);

    // let products = await productModel.find();
    // console.log(products);

    // res.send(products);
    res.send('this is api of mobile ')

})

router.post('/addProduct', async (req, res) => {
    await mongoose.connect(uri);
    res.send("products");
    // try {
    //     const newProduct = new Product(req.body);
    //     await newProduct.save();
    //     res.status(201).send(newProduct);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send('Internal Server Error');
    // }
});

module.exports = router;
