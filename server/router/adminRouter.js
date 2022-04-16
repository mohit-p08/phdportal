const router = require("express").Router();
const adminCtrl = require("../controller/adminCtrl");
const auth = require("../middleware/auth");

router.get("/", auth, adminCtrl.getCounts);
router.post("/remind", auth, adminCtrl.remindDean);
router.post("/getfaculty", auth, adminCtrl.getFacultyApplications);
router.post("/getapproved", auth, adminCtrl.getApprovedFacultyApplications);
router.get("/:id", auth, adminCtrl.getApplication);
router.post("/confirm/:id", auth, adminCtrl.confirmation);

// router.get("/all", auth, adminCtrl.getApplications);

module.exports = router;
