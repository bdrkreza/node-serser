module.exports = {
  createCategories: (req, res, next) => {
    console.log(req.user);

    res.status(200).json("create categorin is ready");
  },
  getAllCategories: (req, res, next) => {
    res.status(200).json("get all categorin is ready");
  },
  getByIdCategories: (req, res, next) => {
    res.status(200).json("get sengle categorin is ready");
  }
};
