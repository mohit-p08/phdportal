// Faculty of Pharmacy
// Faculty of Applied Science
// Faculty of Medical Science
// Faculty of Management Studies
// Faculty of Technology & Engineering
// Faculty of Computer Science & Application

const Candidate = require("../model/candidateModel");
const sendEmail = require("../controller/requestSendMail");
const Users = require("../model/userModel");
const { gmail } = require("googleapis/build/src/apis/gmail");

const adminCtrl = {
  // get all applications count
  getCounts: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });
      if (user.flag == 2) {
        const totalApplications = await Candidate.count();
        const pendingApplications = await Candidate.count({ status: 0 });
        const approvedApplications = await Candidate.count({ status: 1 });
        const rejectedApplications = await Candidate.count({ status: 2 });
        // Faculty of Pharmacy
        const totalApplicationsFOP = await Candidate.count({
          facultyPhD: "Faculty of Pharmacy",
        });
        const pendingApplicationsFOP = await Candidate.count({
          status: 0,
          facultyPhD: "Faculty of Pharmacy",
        });
        const approvedApplicationsFOP = await Candidate.count({
          status: 1,
          facultyPhD: "Faculty of Pharmacy",
        });
        const rejectedApplicationsFOP = await Candidate.count({
          status: 2,
          facultyPhD: "Faculty of Pharmacy",
        });

        // Faculty of Applied Science
        const totalApplicationsFOAS = await Candidate.count({
          facultyPhD: "Faculty of Applied Science",
        });
        const pendingApplicationsFOAS = await Candidate.count({
          status: 0,
          facultyPhD: "Faculty of Applied Science",
        });
        const approvedApplicationsFOAS = await Candidate.count({
          status: 1,
          facultyPhD: "Faculty of Applied Science",
        });
        const rejectedApplicationsFOAS = await Candidate.count({
          status: 2,
          facultyPhD: "Faculty of Applied Science",
        });

        // Faculty of Medical Science
        const totalApplicationsFOMS = await Candidate.count({
          facultyPhD: "Faculty of Medical Science",
        });
        const pendingApplicationsFOMS = await Candidate.count({
          status: 0,
          facultyPhD: "Faculty of Medical Science",
        });
        const approvedApplicationsFOMS = await Candidate.count({
          status: 1,
          facultyPhD: "Faculty of Medical Science",
        });
        const rejectedApplicationsFOMS = await Candidate.count({
          status: 2,
          facultyPhD: "Faculty of Medical Science",
        });

        // Faculty of Management Studies
        const totalApplicationsFOMST = await Candidate.count({
          facultyPhD: "Faculty of Management Studies",
        });
        const pendingApplicationsFOMST = await Candidate.count({
          status: 0,
          facultyPhD: "Faculty of Management Studies",
        });
        const approvedApplicationsFOMST = await Candidate.count({
          status: 1,
          facultyPhD: "Faculty of Management Studies",
        });
        const rejectedApplicationsFOMST = await Candidate.count({
          status: 2,
          facultyPhD: "Faculty of Management Studies",
        });

        // Faculty of Technology & Engineering
        const totalApplicationsFTE = await Candidate.count({
          facultyPhD: "Faculty of Technology & Engineering",
        });
        const pendingApplicationsFTE = await Candidate.count({
          status: 0,
          facultyPhD: "Faculty of Technology & Engineering",
        });
        const approvedApplicationsFTE = await Candidate.count({
          status: 1,
          facultyPhD: "Faculty of Technology & Engineering",
        });
        const rejectedApplicationsFTE = await Candidate.count({
          status: 2,
          facultyPhD: "Faculty of Technology & Engineering",
        });

        // Faculty of Computer Science & Application
        const totalApplicationsFCSA = await Candidate.count({
          facultyPhD: "Faculty of Computer Science & Application",
        });
        const pendingApplicationsFCSA = await Candidate.count({
          status: 0,
          facultyPhD: "Faculty of Computer Science & Application",
        });
        const approvedApplicationsFCSA = await Candidate.count({
          status: 1,
          facultyPhD: "Faculty of Computer Science & Application",
        });
        const rejectedApplicationsFCSA = await Candidate.count({
          status: 2,
          facultyPhD: "Faculty of Computer Science & Application",
        });

        const application = {
          totalApplications: totalApplications,
          pendingApplications: pendingApplications,
          approvedApplications: approvedApplications,
          rejectedApplications: rejectedApplications,
          // FOP
          totalApplicationsFOP: totalApplicationsFOP,
          pendingApplicationsFOP: pendingApplicationsFOP,
          approvedApplicationsFOP: approvedApplicationsFOP,
          rejectedApplicationsFOP: rejectedApplicationsFOP,
          // FOAS
          totalApplicationsFOAS: totalApplicationsFOAS,
          pendingApplicationsFOAS: pendingApplicationsFOAS,
          approvedApplicationsFOAS: approvedApplicationsFOAS,
          rejectedApplicationsFOAS: rejectedApplicationsFOAS,
          // FOMS
          totalApplicationsFOMS: totalApplicationsFOMS,
          pendingApplicationsFOMS: pendingApplicationsFOMS,
          approvedApplicationsFOMS: approvedApplicationsFOMS,
          rejectedApplicationsFOMS: rejectedApplicationsFOMS,
          // FOMST
          totalApplicationsFOMST: totalApplicationsFOMST,
          pendingApplicationsFOMST: pendingApplicationsFOMST,
          approvedApplicationsFOMST: approvedApplicationsFOMST,
          rejectedApplicationsFOMST: rejectedApplicationsFOMST,
          // FTE
          totalApplicationsFTE: totalApplicationsFTE,
          pendingApplicationsFTE: pendingApplicationsFTE,
          approvedApplicationsFTE: approvedApplicationsFTE,
          rejectedApplicationsFTE: rejectedApplicationsFTE,
          // FCSA
          totalApplicationsFCSA: totalApplicationsFCSA,
          pendingApplicationsFCSA: pendingApplicationsFCSA,
          approvedApplicationsFCSA: approvedApplicationsFCSA,
          rejectedApplicationsFCSA: rejectedApplicationsFCSA,
        };
        return res.status(200).json(application);
      } else {
        return res.status(400).json({
          msg: "You are not ADMIN",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // remind dean to approve pending applications
  remindDean: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });
      if (user.flag == 2) {
        // send facultyPhD in val from front end
        const dean = await Users.findOne({ post: req.body.val });
        const count = await Candidate.count({
          status: 0,
          facultyPhD: req.body.val,
        });
        if (count == 0)
          return res
            .status(400)
            .json({ msg: "No pending applications found!!" });
        sendEmail(
          "prajapatimohit10@gmail.com",
          `Respected Dean`,
          `You have ${count} pending PhD applications for approval`,
          `Please complete it as soon as possible`,
          `Thank You!`
        );
        return res.status(200).json({ msg: "Remainder sent successfully" });
      } else {
        return res.status(400).json({
          msg: "You are not ADMIN",
        });
      }
    } catch (err) {
      return res.status().json({ msg: err.message });
    }
  },

  // get all the applications of particular facultyPhD
  getFacultyApplications: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });
      if (user.flag == 2) {
        // pass faculty PhD in val from front end
        const application = await Candidate.find({
          facultyPhD: req.body.val,
        }).exec();
        if (!application)
          return res
            .status(200)
            .json({ msg: `No applications found for ${req.body.val}` });

        return res.status(200).json(application);
      } else {
        return res.status(400).json({
          msg: "You are not ADMIN",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get all the approved applications of particular facultyPhD
  getApprovedFacultyApplications: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });
      if (user.flag == 2) {
        // pass faculty PhD in val from front end
        const application = await Candidate.find({
          facultyPhD: req.body.val,
          status: 1,
        }).exec();
        if (!application)
          return res
            .status(200)
            .json({ msg: `No applications found for ${req.body.val}` });

        return res.status(200).json(application);
      } else {
        return res.status(400).json({
          msg: "You are not ADMIN",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get particular application
  getApplication: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });
      if (user.flag == 2) {
        const particularApplication = await Candidate.findById({
          _id: req.params.id,
        });
        return res.status(200).json(particularApplication);
      } else {
        return res.status(400).json({
          msg: "You are not ADMIN",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  confirmation: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });
      if (user.flag == 2) {
        const application = await Candidate.findById({ _id: req.params.id });
        if (application.emailStatus == 1)
          return res
            .status(400)
            .json({ msg: "Confirmation Email Already sent!!" });
        sendEmail(
          application.email,
          `Dear ${application.name}`,
          `Greeting from CHARUSAT, Congratulations! Your application for pursuing PhD in ${application.facultyPhD} with specialization in ${application.deptPhD} has successfuly been approved`,
          "Please visit campus office for further proceedings",
          "Thank You!"
        );
        await Candidate.findByIdAndUpdate(
          {
            _id: req.params.id,
          },
          { emailStatus: 1 }
        );
        return res.status(200).json({ msg: "Confirmation sent successfully" });
      } else {
        return res.status(400).json({
          msg: "You are not ADMIN",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get all the applications
  getApplications: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });
      if (user.flag == 2) {
        const allApplications = await Candidate.find().exec();
        return res.status(200).json(allApplications);
      } else {
        return res.status(400).json({
          msg: "You are not ADMIN",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = adminCtrl;
