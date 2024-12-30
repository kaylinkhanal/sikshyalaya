const Product = require("../models/product");
const addNewProduct = async (req, res) => {
    Product.create(req.body)
    res.send({msg: 'Event  has been created'})
  };
  const getAllProducts = async (req, res) => {
    const data = await  Product.find()
    res.send(data)
  };
  module.exports = {addNewProduct, getAllProducts }; 