const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Carts = new Schema({
    product: {
        type: Object,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model('cart', Carts);