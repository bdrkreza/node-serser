const { Router } = require("express");
const { productCtrl } = require("../controllers");
const { auth } = require("../middleware");

const router = Router();

router.route("/").post(productCtrl.createProduct);
router.route("/").get(productCtrl.getAllProduct);
router
  .route("/:id")
  .get(productCtrl.getByIdProduct)
  .put(auth.user, auth.admin, productCtrl.updateProduct)
  .delete(auth.user, auth.admin, productCtrl.deleteProduct);

module.exports = router;
