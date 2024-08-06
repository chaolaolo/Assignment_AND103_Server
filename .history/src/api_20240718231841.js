
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

router.put('/updateProduct/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send('Product deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
