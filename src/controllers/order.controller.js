const { OrderModel } = require("../models");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const newOrder = new OrderModel(req.body);
      const saveOrder = await newOrder.save();
      res.status(200).json({ status: true, data: saveOrder });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const query = req.query;
      const Order = await OrderModel.find(query);
      res.status(200).json(Order);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getByIdOrder: async (req, res) => {
    try {
      const Order = await OrderModel.findById(req.params.id);
      if (!Order) {
        res.status(400).json({ message: "Order not found" });
      }
      res.status(200).json({ Order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const Order = await OrderModel.findById({ _id: id });
      if (Order) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
          id,
          {
            $set: req.body
          },
          {
            new: true
          }
        );
        res.status(200).json({ status: true, Order: updatedOrder });
      } else {
        res.status(200).json({ message: "No Order found with this Id!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const Order = await OrderModel.findById(req.params.id);
      if (Order) {
        await Order.remove();
        res.status(200).json({ message: "Order Deleted successfully!" });
      } else {
        res.status(200).json({ message: "Order not found with this Id!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  income: async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await OrderModel.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount"
          }
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" }
          }
        }
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
