const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
      productName: { type: String },
      productPrice: { type: Number },
      productDescription:{ type: String }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;


