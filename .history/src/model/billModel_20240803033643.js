const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bills = new Schema({
    userId: {
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    note:{
        type: String,
    },
    paymethod:{
        type: String,
        required: true
    },
    product: {
        type: Array,
        require: true
    },
     
}, { timestamps: true });

module.exports = mongoose.model('bill', Bills);