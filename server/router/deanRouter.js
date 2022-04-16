const router = require("express").Router();
const auth = require("../middleware/auth");
const deanCtrl = require("../controller/deanCtrl");

router.get("/", auth, deanCtrl.getCounts);
router.get("/all", auth, deanCtrl.getApplications);
router.get("/:id", auth, deanCtrl.getApplication);
router.post("/update/:id", auth, deanCtrl.selection);

module.exports = router;
