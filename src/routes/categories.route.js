const { Router } = require("express");
const { categoriesCtrl } = require("../controllers");
const { auth } = require("../middleware");

const router = Router();

router.route("/").post(categoriesCtrl.createCategories);
router.route("/").get(categoriesCtrl.getAllCategories);
router
  .route("/:id")
  .get(categoriesCtrl.getByIdCategories)
  .put(auth.user, auth.admin, categoriesCtrl.updateCategories)
  .delete(auth.user, auth.admin, categoriesCtrl.deleteCategories);

module.exports = router;
