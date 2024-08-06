const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model('product', Products);