// Bug 1(createApplication): If net exam details not provided but degree details provided, degree gets saved.

const Academic = require("../model/academicSchema");
const Candidate = require("../model/candidateModel");
const Degree = require("../model/degreeSchema");

const candidateCtrl = {
  // create
  createApplication: async (req, res) => {
    try {
      // if user has already applied
      const check = await Candidate.findOne({ userId: req.user.id });
      if (check)
        return res.status(409).json({
          msg: "Your application has already been processed. Please wait for the response.",
        });
      const {
        tId,
        tDate,
        phdType,
        facultyPhD,
        deptPhD,
        name,
        gender,
        address,
        city,
        state,
        pinCode,
        academics,
        netExam,
        draft,
      } = req.body;

      const newApplication = new Candidate({
        userId: req.user.id,
        tId,
        tDate,
        phdType: phdType == 1 ? "Full - Time" : "Part - Time",
        facultyPhD,
        deptPhD,
        name,
        gender,
        address,
        city,
        state,
        pinCode,
        academics:
          academics == 1
            ? "Master Degree Completed with > 60%"
            : "Awaited for the Result [Upload last 3 semester marksheets]",
        netExam: netExam == 1 ? "Yes" : "No",
        draft,
      });

      if (academics == 1) {
        // 1 final marksheet
        const { degreeName, universityName, yearOfPassing, score } = req.body;
        if (!degreeName || !universityName || !yearOfPassing || !score)
          return res.status(409).json({ msg: "Please fill all fields" });
        const newDegree = new Degree({
          userId: req.user.id,
          degreeName,
          universityName,
          yearOfPassing,
          score,
          count: 0,
        });
        await newDegree.save();
      } else {
        // 3 marksheets
        const {
          degreeName1,
          universityName1,
          yearOfPassing1,
          score1,
          degreeName2,
          universityName2,
          yearOfPassing2,
          score2,
          degreeName3,
          universityName3,
          yearOfPassing3,
          score3,
        } = req.body;

        if (
          !degreeName1 ||
          !universityName1 ||
          !yearOfPassing1 ||
          !score1 ||
          !degreeName2 ||
          !universityName2 ||
          !yearOfPassing2 ||
          !score2 ||
          !degreeName2 ||
          !universityName2 ||
          !yearOfPassing2 ||
          !score2
        )
          return res.status(409).json({ msg: "Please fill degree details" });

        const newDegree1 = new Degree({
          userId: req.user.id,
          degreeName: degreeName1,
          universityName: universityName1,
          yearOfPassing: yearOfPassing1,
          score: score1,
          count: 1,
        });
        const newDegree2 = new Degree({
          userId: req.user.id,
          degreeName: degreeName2,
          universityName: universityName2,
          yearOfPassing: yearOfPassing2,
          score: score2,
          count: 2,
        });
        const newDegree3 = new Degree({
          userId: req.user.id,
          degreeName: degreeName3,
          universityName: universityName3,
          yearOfPassing: yearOfPassing3,
          score: score3,
          count: 3,
        });
        // console.log(degreeName1);
        // console.log(newDegree2);
        // console.log(newDegree3);
        await newDegree1.save();
        await newDegree2.save();
        await newDegree3.save();
      }

      if (netExam == 1) {
        const { nameAsInExam, scoreAsInExam, validity } = req.body;
        if (!nameAsInExam || !scoreAsInExam || !validity)
          return res.status(409).json({ msg: "Please fill NET Exam details" });
        const newAcademic = new Academic({
          userId: req.user.id,
          nameAsInExam,
          scoreAsInExam,
          validity,
        });
        await newAcademic.save();
      }

      await newApplication.save();
      console.log("Application Generated Successfully!");
      res.status(201).json("Application Processed Successfully!");
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },

  // update draft
  submitApplication: async (req, res) => {
    const user = await Candidate.findOne({ userId: req.user.id });
    if (user.draft == 0)
      // already submitted
      return res
        .status(409)
        .json({ msg: "You have already submitted the application" });

    const {
      tId,
      tDate,
      phdType,
      facultyPhD,
      deptPhD,
      name,
      gender,
      address,
      city,
      state,
      pinCode,
      academics,
      netExam,
      draft,
    } = req.body;

    await Candidate.findOneAndUpdate(
      { userId: req.user.id },
      {
        tId,
        tDate,
        phdType: phdType == 1 ? "Full - Time" : "Part - Time",
        facultyPhD,
        deptPhD,
        name,
        gender,
        address,
        city,
        state,
        pinCode,
        academics:
          academics == 1
            ? "Master Degree Completed with > 60%"
            : "Awaited for the Result [Upload last 3 semester marksheets]",
        netExam: netExam == 1 ? "Yes" : "No",
        draft,
      }
    );

    // Degree certificate CRUD - degreeSchema
    if (academics == 1) {
      // 1 final marksheet

      // if user updates/wants to enter new marksheet
      const checkMarksheet = await Degree.findOne({
        userId: req.user.id,
        count: 0,
      });
      if (!checkMarksheet) {
        const { degreeName, universityName, yearOfPassing, score } = req.body;
        const newDegree = new Degree({
          userId: req.user.id,
          degreeName,
          universityName,
          yearOfPassing,
          score,
          count: 0,
        });
        await newDegree.save();

        // delete last 3 sem marksheet uploaded
        await Degree.findOneAndDelete({ userId: req.user.id, count: 1 });
        await Degree.findOneAndDelete({ userId: req.user.id, count: 2 });
        await Degree.findOneAndDelete({ userId: req.user.id, count: 3 });
      } else {
        // if marksheet is already present with percentage > 60%
        const { degreeName, universityName, yearOfPassing, score } = req.body;
        await Degree.findOneAndUpdate(
          { userId: req.user.id, count: 0 },
          {
            degreeName,
            universityName,
            yearOfPassing,
            score,
          }
        );
      }
    } else {
      // last 3 marksheets
      const {
        degreeName1,
        universityName1,
        yearOfPassing1,
        score1,
        degreeName2,
        universityName2,
        yearOfPassing2,
        score2,
        degreeName3,
        universityName3,
        yearOfPassing3,
        score3,
      } = req.body;

      // if option changed at the end to enter new last 3 marksheets
      const checkNew = await Degree.findOne({ userId: req.user.id, count: 1 });
      // here deletion of final marksheet is not required as a user who upload final marksheet will never
      // change the option to upload last 3 marksheet
      if (!checkNew) {
        // even this is not required
        const newDegree1 = new Degree({
          userId: req.user.id,
          degreeName: degreeName1,
          universityName: universityName1,
          yearOfPassing: yearOfPassing1,
          score: score1,
          count: 1,
        });
        const newDegree2 = new Degree({
          userId: req.user.id,
          degreeName: degreeName2,
          universityName: universityName2,
          yearOfPassing: yearOfPassing2,
          score: score2,
          count: 2,
        });
        const newDegree3 = new Degree({
          userId: req.user.id,
          degreeName: degreeName3,
          universityName: universityName3,
          yearOfPassing: yearOfPassing3,
          score: score3,
          count: 3,
        });
        // console.log(degreeName1);
        // console.log(newDegree2);
        // console.log(newDegree3);
        await newDegree1.save();
        await newDegree2.save();
        await newDegree3.save();
      } else {
        // update marksheet
        await Degree.findOneAndUpdate(
          { userId: req.user.id, count: 1 },
          {
            degreeName: degreeName1,
            universityName: universityName1,
            yearOfPassing: yearOfPassing1,
            score: score1,
          }
        );
        await Degree.findOneAndUpdate(
          { userId: req.user.id, count: 2 },
          {
            degreeName: degreeName2,
            universityName: universityName2,
            yearOfPassing: yearOfPassing2,
            score: score2,
          }
        );
        await Degree.findOneAndUpdate(
          { userId: req.user.id, count: 3 },
          {
            degreeName: degreeName3,
            universityName: universityName3,
            yearOfPassing: yearOfPassing3,
            score: score3,
          }
        );
      }
    }

    // Net Exam CRUD - academicSchema
    if (netExam == 1) {
      const { nameAsInExam, scoreAsInExam, validity } = req.body;
      const checkExam = await Academic.findOne({ userId: req.user.id });
      if (checkExam) {
        await Academic.findOneAndUpdate(
          { userId: req.user.id },
          {
            nameAsInExam,
            scoreAsInExam,
            validity,
          }
        );
      } else {
        // If user now selected to upload exam details and previous selection was to not upload details
        const newAcademic = new Academic({
          userId: req.user.id,
          nameAsInExam,
          scoreAsInExam,
          validity,
        });
        await newAcademic.save();
      }
    } else {
      const checkExam = await Academic.findOne({ userId: req.user.id });
      if (checkExam)
        // delete score if it was uploaded previously
        await Academic.findOneAndDelete({ userId: req.user.id });
    }

    // send email of submitted application containing PDF
    res.status(201).json("Application Processed Successfully!");
  },

  // read data
  getApplication: async (req, res) => {
    try {
      const { userId } = req.user.id;
      const application = await Candidate.findOne({
        userId: req.user.id,
      }).exec();

      if (!application)
        return res.status(409).json({
          msg: "You have not submitted any application",
        });
      // console.log(application);

      let checkMarksheet;
      if (application.academics == "Master Degree Completed with > 60%") {
        checkMarksheet = await Degree.findOne({
          userId: req.user.id,
          count: 0,
        }).exec();
        // console.log(checkMarksheet);
      } else {
        const checkMarksheet1 = await Degree.findOne({
          userId: req.user.id,
          count: 1,
        }).exec();
        const checkMarksheet2 = await Degree.findOne({
          userId: req.user.id,
          count: 2,
        }).exec();
        const checkMarksheet3 = await Degree.findOne({
          userId: req.user.id,
          count: 3,
        }).exec();
        checkMarksheet = {
          checkMarksheet1: checkMarksheet1,
          checkMarksheet2: checkMarksheet2,
          checkMarksheet3: checkMarksheet3,
        };
        // console.log(checkMarksheet);
      }

      let checkNetExam;
      if (application.netExam == "Yes") {
        checkNetExam = await Academic.findOne({
          userId: req.user.id,
        }).exec();
        // console.log(checkNetExam);
      }

      let finalData;
      if (checkNetExam) {
        finalData = {
          application: application,
          checkMarksheet: checkMarksheet,
          checkNetExam: checkNetExam,
        };
      } else {
        finalData = {
          application: application,
          checkMarksheet: checkMarksheet,
        };
      }

      console.log("Fetched Data Successfully!");

      return res.status(201).json(finalData);
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },
};

module.exports = candidateCtrl;
