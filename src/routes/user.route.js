const { Router } = require("express");
const { userCtrl } = require("../controllers");

const router = Router();

router.route("/signup").post(userCtrl.register);
router.route("/login").post(userCtrl.login);

module.exports = router;
