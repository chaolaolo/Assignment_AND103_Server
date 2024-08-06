const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Carts = new Schema({
    productId: {
        type: String,
        require: true
    },
    quantity: {
        type: Int32,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model('cart', Carts);