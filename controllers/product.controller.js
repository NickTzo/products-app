const logger = require('../logger/logger');
const Product = require('../models/product.model');

exports.findAll = async (req, res) => {
  console.log("Find all products");

  try {
    const result = await Product.find();
    res.status(200).json({ status: true, data: result });
    console.log("Succes in reading all products");
    logger.info("Log info success in reading all products");
    logger.log("Logger success in reading all products");
  } catch (err) {
    res.status(400).json({ status: false, data: err })
    console.log("Problem in reading all products");
    logger.err("Problem in reading all products");
  }
}


exports.findOne = async (req, res) => {
  const product = req.params.product
  console.log("Find product with product name", product);
  try {
    const results = await Product.findOne();
    res.status(200).json({ status: true, data: results });
    console.log("Success in reading product");
    logger.info("Success in reading product");
    logger.log("Success in reading product");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in reading product", product);
    logger.err("Problem in reading product");
  }
}

exports.create = async (req, res) => {
  const newProduct = new Product({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  })
  console.log("Insert product with product name : ", req.body.product);
  try {
    const result = await newProduct.save();
    res.status(200).json({ status: true, data: result });
    console.log('Success in inserting product: ', req.body.product);
    logger.info("Success in inserting product");
    logger.log("Success in inserting product");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in inserting product", req.bod.product);
    logger.err("Problem in inserting product");
  }
}

exports.update = async (req, res) => {
  const product = req.body.product;
  console.log("Update product: ", req.body.product);

  const updateProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  }
  try {
    const result = await Product.findOneAndUpdate({ product: product }, updateProduct, { new: true });
    res.status(200).json({ status: true, data: result });
    console.log("Success in updating product: ", product);
    logger.info("Success in update product");
    logger.log("Success in update product");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in update product: ", req.body.product);
    logger.err("Problem in update product");
  }
}

exports.delete = async (req, res) => {
  const product = req.body.product;
  console.log("Delete product: ", product);
  try {
    const result = await Product.findOneAndRemove({ product: product });
    res.status(200).json({ status: true, data: result });
    console.log("Success in deleting product: ", product)
    logger.info("Success in deleting product");
    logger.log("Success in deleting product");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in deleting product: ", product);
    logger.err("Problem in deleting product");
  }
}

