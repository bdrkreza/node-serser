const { Router } = require("express");
const { orderCtrl } = require("../controllers");
const { auth } = require("../middleware");

const router = Router();

router.route("/").post(auth.user, orderCtrl.createOrder);
router.route("/").get(orderCtrl.getAllOrder);
router.route("/id").get(orderCtrl.getByIdOrder);

module.exports = router;
