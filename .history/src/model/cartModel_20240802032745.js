const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Carts = new Schema({
    userId: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
        min:1
    },
}, { timestamps: true });

module.exports = mongoose.model('cart', Carts);