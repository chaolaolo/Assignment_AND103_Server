
const express = require('express');
const { default: mongoose } = require('mongoose');
const COMMON = require('./COMMON');

const productModel = require('./model/productModel');
const categoryModel = require('./model/categoryModel');
const cartModel = require('./model/cartModel');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('this is api of mobile ')
})

const uri = COMMON.uri;

// all of task with Product =====////
router.get('/listProducts', async (req, res) => {
    await mongoose.connect(uri);

    let products = await productModel.find();
    console.log(products);

    res.send(products);
})

//add
router.post('/addProduct', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const { name, address, image, size, category, price } = req.body;
        let cate = await categoryModel.findOne({ title: category });
        if (!cate) {
            cate = new categoryModel({ title: category });
            await cate.save();
        }
        const newProduct = new productModel({
            name: name,
            address: address,
            image: image,
            size: size,
            price: price,
            category: cate.title
        });
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


//update
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

//delete
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

//// all of task with Categories =====////

//get 
router.get('/listCategories', async (req, res) => {
    try {
        await mongoose.connect(uri);
        let categories = await categoryModel.find();  // Assuming you have a Category model
        res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


////==== all of task with Categories =====////

// API để lấy danh sách giỏ hàng của người dùng
router.get('/getListCart/:userId', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const userId = req.params.userId;
        // Tìm tất cả các mục trong giỏ hàng của người dùng
        const cartItems = await cartModel.find({ userId: userId }).populate('product');

        if (!cartItems) {
            return res.status(404).send('Cart items not found');
        }

        // Trả về danh sách các mục trong giỏ hàng
        res.status(200).send(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


//add
router.post('/addToCart', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const { userId, product } = req.body; // Giả định bạn sẽ gửi productId và userId từ client
        let products = await productModel.findById(product);
        if (!products) {
            return res.status(404).send('products not found');
        }
        const newCartItem = new cartModel({
            userId: userId,
            product: product,
            quantity: 1
        });
        await newCartItem.save();
        res.status(201).send(newCartItem);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// delete
// Xóa sản phẩm khỏi giỏ hàng
router.delete('/removeCartItem/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const cartItemId = req.params.id;

        // Tìm và xóa sản phẩm khỏi giỏ hàng
        const deletedCartItem = await cartModel.findByIdAndDelete(cartItemId);
        if (!deletedCartItem) {
            return res.status(404).send('Sản phẩm trong giỏ hàng không tìm thấy');
        }
        res.status(200).send('Sản phẩm đã được xóa khỏi giỏ hàng');
    } catch (error) {
        console.log(error);
        console.log('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
        res.status(500).send('Internal Server Error');
    }
});

//updatequantity
router.put('/updateCartItem/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const id = req.params.id;
        const { quantity } = req.body;

        // Kiểm tra giá trị số lượng
        if (quantity < 1) {
            return res.status(400).json({ message: 'Số lượng không hợp lệ' });
        }
        // Tìm và cập nhật sản phẩm trong giỏ hàng
        // const cartItem = await cartModel.findByIdAndUpdate(id);
        const cartItem = await cartModel.findById(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Số lượng sản phẩm đã được cập nhật' });
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});


//update size
router.put('/updateCartSize/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const cartId = req.params.product._id;
        const { size } = req.body;
        // Tìm và cập nhật kích thước sản phẩm trong giỏ hàng
        const result = await cartModel.findOneAndUpdate(
            { _id: cartId },
            { $set: { size: size } },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.status(200).json({ message: 'Kích thước sản phẩm đã được cập nhật' });
    } catch (error) {
        console.error('Lỗi khi cập nhật kích thước sản phẩm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

module.exports = router;
