module.exports = {
  createOrder: (req, res, next) => {
    res.status(200).json("create order is ready");
  },
  getAllOrder: (req, res, next) => {
    res.status(200).json("get all order is ready");
  },
  getByIdOrder: (req, res, next) => {
    res.status(200).json("get sengle order is ready");
  }
};
