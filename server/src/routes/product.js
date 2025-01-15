const express = require("express");
const router = express.Router();
const { getAllProducts, addNewProduct} = require('../controllers/product');
  router.post('/products', addNewProduct)
  router.get('/products', getAllProducts)
  
module.exports = router