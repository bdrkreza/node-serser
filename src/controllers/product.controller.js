module.exports = {
  createProduct: (req, res, next) => {
    res.status(200).json("create product is ready");
  },
  getAllProduct: (req, res, next) => {
    res.status(200).json("get all product is ready");
  },
  getByIdProduct: (req, res, next) => {
    res.status(200).json("get sengle product is ready");
  }
};
