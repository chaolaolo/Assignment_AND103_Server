const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = new Schema({
    title: {
        type: String,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model('category', Categories);