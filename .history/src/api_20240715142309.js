
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

    let productModel = await productModel.find();
    console.log(productModel);

    res.send(productModel);
})

module.exports = router;
