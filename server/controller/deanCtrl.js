// Faculty of Pharmacy
// Faculty of Applied Science
// Faculty of Medical Science
// Faculty of Management Studies
// Faculty of Technology & Engineering
// Faculty of Computer Science & Application

const Candidate = require("../model/candidateModel");
const Users = require("../model/userModel");

const deanCtrl = {
  // get all the count
  getCounts: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });

      if (user.flag == 1) {
        const totalApplications = await Candidate.count({
          facultyPhD: user.post,
        });
        const pendingApplications = await Candidate.count({
          status: 0,
          facultyPhD: user.post,
        });
        const approvedApplications = await Candidate.count({
          status: 1,
          facultyPhD: user.post,
        });
        const rejectedApplications = await Candidate.count({
          status: 2,
          facultyPhD: user.post,
        });

        const application = {
          totalApplications: totalApplications,
          pendingApplications: pendingApplications,
          approvedApplications: approvedApplications,
          rejectedApplications: rejectedApplications,
        };
        return res.status(200).json(application);
      } else {
        return res.status(500).json({
          msg: "You are not a dean!",
        });
      }
    } catch (err) {
      return res.status(400).json({
        msg: err.message,
      });
    }
  },

  // get all applications of particular faculty
  getApplications: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });

      if (user.flag == 1) {
        const applications = await Candidate.find({
          facultyPhD: user.post,
        }).exec();
        return res.status(200).json(applications);
      } else {
        return res.status(400).json({
          msg: "You are not a dean!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  // get particular application - in future to get generated PDF
  getApplication: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });

      if (user.flag == 1) {
        const candidate = await Candidate.findById({
          _id: req.params.id,
        }).exec();
        return res.status(200).json(candidate);
      } else {
        return res.status(400).json({
          msg: "You are not a dean!",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // approve or reject candidate
  selection: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id });

      if (user.flag == 1) {
        await Candidate.findOneAndUpdate(
          { _id: req.params.id },
          {
            status: req.body.val,
          }
        );
        return res
          .status(200)
          .json({ msg: "Operation Performed Successfully" });
      } else {
        return res.status(400).json({
          msg: "You are not a dean!",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = deanCtrl;
