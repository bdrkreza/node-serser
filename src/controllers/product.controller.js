const { ProductModel } = require("../models");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const newProduct = new ProductModel(req.body);
      const saveProduct = await newProduct.save();
      res.status(200).json({ status: true, data: saveProduct });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const query = req.query;
      const product = await ProductModel.find(query);
      res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getByIdProduct: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        res.status(400).json({ message: "product not found" });
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById({ _id: id });
      if (product) {
        const updatedproduct = await ProductModel.findByIdAndUpdate(
          id,
          {
            $set: req.body
          },
          {
            new: true
          }
        );
        res.status(200).json({ status: true, product: updatedproduct });
      } else {
        res.status(200).json({ message: "No product found with this Id!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (product) {
        await product.remove();
        res.status(200).json({ message: "product Deleted successfully!" });
      } else {
        res.status(200).json({ message: "product not found with this Id!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
