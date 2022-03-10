const auth = require("../middleware/auth");
const router = require("express").Router();
const userCtrl = require("../controller/userCtrl");

router.post("/changepassword", auth, userCtrl.resetPassword);
router.post("/forgotpassword", userCtrl.forgotpassword);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.post("/refresh_token", userCtrl.getAccessToken);
router.post("/register", userCtrl.register);

module.exports = router;
