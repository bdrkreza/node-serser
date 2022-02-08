const { Router } = require("express");
const { productCtrl } = require("../controllers");

const router = Router();

router.route("/").post(productCtrl.createProduct);
router.route("/").get(productCtrl.getAllProduct);
router.route("/id").get(productCtrl.getByIdProduct);

module.exports = router;
