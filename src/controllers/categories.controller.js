const { CategoriesModel } = require("../models");

module.exports = {
  createCategories: async (req, res) => {
    try {
      const newCategories = new CategoriesModel(req.body);
      const saveCategories = await newCategories.save();
      res.status(200).json({ status: true, data: saveCategories });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const query = req.query;
      const Categories = await CategoriesModel.find(query);
      res.status(200).json(Categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getByIdCategories: async (req, res) => {
    try {
      const Categories = await CategoriesModel.findById(req.params.id);
      if (!Categories) {
        res.status(400).json({ message: "Categories not found" });
      }
      res.status(200).json({ Categories });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateCategories: async (req, res) => {
    try {
      const { id } = req.params;
      const Categories = await CategoriesModel.findById({ _id: id });
      if (Categories) {
        const updatedCategories = await CategoriesModel.findByIdAndUpdate(
          id,
          {
            $set: req.body
          },
          {
            new: true
          }
        );
        res.status(200).json({ status: true, Categories: updatedCategories });
      } else {
        res.status(200).json({ message: "No Categories found with this Id!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteCategories: async (req, res) => {
    try {
      const Categories = await CategoriesModel.findById(req.params.id);
      if (Categories) {
        await Categories.remove();
        res.status(200).json({ message: "Categories Deleted successfully!" });
      } else {
        res.status(200).json({ message: "Categories not found with this Id!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
