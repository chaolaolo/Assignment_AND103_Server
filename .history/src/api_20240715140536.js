
const express = require('express');

const router = express.Router();


router.get('/',(req,res)=>{
    res.send('this is api of mobile ')
})

module.exports= router;
