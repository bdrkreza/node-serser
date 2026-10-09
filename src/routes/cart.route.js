const { Router } = require("express");
const { cartCtrl } = require("../controllers");
const { auth } = require("../middleware");

const router = Router();

router.route("/").post(cartCtrl.createCart);
router.route("/").get(cartCtrl.getAllCart);
router
  .route("/:id")
  .get(cartCtrl.getByIdCart)
  .put(auth.user, auth.admin, cartCtrl.updateCart)
  .delete(auth.user, auth.admin, cartCtrl.deleteCart);

module.exports = router;
