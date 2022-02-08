const { Router } = require("express");
const { categoriesCtrl } = require("../controllers");

const router = Router();

router.route("/").post(categoriesCtrl.createCategories);
router.route("/").post(categoriesCtrl.getAllCategories);
router.route("/id").get(categoriesCtrl.getByIdCategories);

module.exports = router;
