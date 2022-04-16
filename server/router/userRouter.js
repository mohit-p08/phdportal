const auth = require("../middleware/auth");
const router = require("express").Router();
const userCtrl = require("../controller/userCtrl");

router.post("/activate", userCtrl.activateEmail);
router.post("/changepassword", auth, userCtrl.resetPassword);
router.post("/forgotpassword", userCtrl.forgotpassword);
router.get("/getUser/:email", userCtrl.getUser);
router.get("/getuserbytoken", auth, userCtrl.getUserByToken);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.post("/refresh_token", userCtrl.getAccessToken);
router.post("/register", userCtrl.register);
router.post("/resetpassword", auth, userCtrl.resetPassword);

module.exports = router;
