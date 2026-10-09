const { CartModel } = require("../models");

module.exports = {
  createCart: async (req, res) => {
    try {
      const newCart = new CartModel(req.body);
      const saveCart = await newCart.save();
      res.status(200).json({ status: true, data: saveCart });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCart: async (req, res) => {
    try {
      const query = req.query;
      const Cart = await CartModel.find(query);
      res.status(200).json(Cart);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getByIdCart: async (req, res) => {
    try {
      const Cart = await CartModel.findById(req.params.id);
      if (!Cart) {
        res.status(400).json({ message: "Cart not found" });
      }
      res.status(200).json({ Cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateCart: async (req, res) => {
    try {
      const { id } = req.params;
      const Cart = await CartModel.findById({ _id: id });
      if (Cart) {
        const updatedCart = await CartModel.findByIdAndUpdate(
          id,
          {
            $set: req.body
          },
          {
            new: true
          }
        );
        res.status(200).json({ status: true, Cart: updatedCart });
      } else {
        res.status(200).json({ message: "No Cart found with this Id!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteCart: async (req, res) => {
    try {
      const Cart = await CartModel.findById(req.params.id);
      if (Cart) {
        await Cart.remove();
        res.status(200).json({ message: "Cart Deleted successfully!" });
      } else {
        res.status(200).json({ message: "Cart not found with this Id!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
