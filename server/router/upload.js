const auth = require("../middleware/auth");
const router = require("express").Router();
const uploadImage = require("../middleware/uploadImage");
const uploadCtrl = require("../controller/uploadCtrl");

// routes for uploading documents
router.post("/upload_avatar", uploadImage, auth, uploadCtrl.uploadAvatar);
router.post("/upload_sign", uploadImage, auth, uploadCtrl.uploadSign);
router.post("/upload_payment", uploadImage, auth, uploadCtrl.uploadPayment);
router.post("/upload_degree", uploadImage, auth, uploadCtrl.uploadDegree);
router.post("/upload_academic", uploadImage, auth, uploadCtrl.uploadAcademic);

module.exports = router;
