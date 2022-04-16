// Bug 1(createApplication): If net exam details not provided but degree details provided, degree gets saved.

const Academic = require("../model/academicSchema");
const axios = require("axios");
const Candidate = require("../model/candidateModel");
const Degree = require("../model/degreeSchema");
const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const sendEmail = require("./requestSendMail");
const Users = require("../model/userModel");

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
        tImg,
        phdType,
        facultyPhD,
        deptPhD,
        name,
        profile,
        gender,
        address,
        city,
        states,
        pinCode,
        academics,
        netExam,
        signature,
        draft,
      } = req.body;

      // if he is a candidate only
      const userEmail = await Users.findById({ _id: req.user.id });
      if (userEmail.flag == 0) {
        const newApplication = new Candidate({
          userId: req.user.id,
          email: userEmail.email,
          tId,
          tDate,
          tImg,
          phdType: phdType == 1 ? "FULL - TIME" : "PART - TIME",
          facultyPhD,
          deptPhD,
          name,
          profile,
          gender,
          address,
          city,
          state: states,
          pinCode,
          academics:
            academics == 1
              ? "Master Degree Completed with > 60%"
              : "Awaited for the Result [Upload last 3 semester marksheets]",
          netExam: netExam == 1 ? "Yes" : "No",
          signature,
          draft,
        });
        if (academics == "1") {
          // 1 final marksheet
          const { degreeName, universityName, yearOfPassing, score, proof } =
            req.body;
          if (
            !degreeName ||
            !universityName ||
            !yearOfPassing ||
            !score ||
            !proof
          )
            return res.status(409).json({ msg: "Please fill all fields" });
          const newDegree = new Degree({
            userId: req.user.id,
            degreeName,
            universityName,
            yearOfPassing,
            score,
            proof,
            count: 0,
          });
          await newDegree.save();
        } else {
          // 3 marksheets
          const {
            degreeName,
            universityName,
            yearOfPassing,
            score,
            proof,
            degreeName2,
            universityName2,
            yearOfPassing2,
            score2,
            proof2,
            degreeName3,
            universityName3,
            yearOfPassing3,
            score3,
            proof3,
          } = req.body;

          if (
            !degreeName ||
            !universityName ||
            !yearOfPassing ||
            !score ||
            !degreeName2 ||
            !universityName2 ||
            !yearOfPassing2 ||
            !score2 ||
            !degreeName3 ||
            !universityName3 ||
            !yearOfPassing3 ||
            !score3
          )
            return res.status(409).json({ msg: "Please fill degree details" });

          const newDegree1 = new Degree({
            userId: req.user.id,
            degreeName: degreeName,
            universityName: universityName,
            yearOfPassing: yearOfPassing,
            score: score,
            proof: proof,
            count: 1,
          });
          const newDegree2 = new Degree({
            userId: req.user.id,
            degreeName: degreeName2,
            universityName: universityName2,
            yearOfPassing: yearOfPassing2,
            score: score2,
            proof: proof2,
            count: 2,
          });
          const newDegree3 = new Degree({
            userId: req.user.id,
            degreeName: degreeName3,
            universityName: universityName3,
            yearOfPassing: yearOfPassing3,
            score: score3,
            proof: proof3,
            count: 3,
          });
          await newDegree1.save();
          await newDegree2.save();
          await newDegree3.save();
        }

        if (netExam == "1") {
          const { nameAsInExam, scoreAsInExam, validity, certificate } =
            req.body;
          if (!nameAsInExam || !scoreAsInExam || !validity)
            return res
              .status(409)
              .json({ msg: "Please fill NET Exam details" });
          const newAcademic = new Academic({
            userId: req.user.id,
            nameAsInExam,
            scoreAsInExam,
            validity,
            certificate,
          });
          console.log(newAcademic);
          await newAcademic.save();
        }
        await newApplication.save();

        // updates application submitted
        await Users.findOneAndUpdate(
          { _id: req.user.id },
          {
            done: 1,
          }
        );

        const user = await Candidate.findOne({ userId: req.user.id });
        if (draft == 0) {
          let pdfDoc = new PDFDocument();
          pdfDoc.pipe(
            fs.createWriteStream(`${name}_CHARUSAT-PHD-2022-${user._id}.pdf`)
          );

          // Date
          var datetime = new Date();
          let date = ("0" + datetime.getDate()).slice(-2);
          let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
          let year = datetime.getFullYear();
          pdfDoc
            .font("Times-Roman")
            .fontSize(10)
            .text(`Application-ID: CHARUSAT-PHD-2022-${user._id}`, {
              align: "left",
              continued: true,
              lineGap: 2,
            })
            .text(`Date: ${date}/${month}/${year}`, {
              align: "right",
            });

          // University Details
          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(14)
            .text("CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY", {
              align: "center",
              lineGap: 2,
            });

          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(10)
            .text(
              "CHARUSAT CAMPUS-Changa, Off.Nadiad -Petlad Highway, Gujarat- 388421",
              {
                align: "center",
              }
            );

          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(10)
            .text("Ph# +91-2697-265011,265021 Fax# +91-2697-265007", {
              align: "center",
            });

          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(10)
            // .fillColor("blue")
            .text(
              "E-mail:admission.phd@charusat.ac.in. web: www.charusat.ac.in",
              {
                align: "center",
                // link: "www.charusat.ac.in",
                lineGap: 2,
              }
            );

          // line break
          pdfDoc.lineTo(100, 160).stroke();

          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(14)
            .text("Ph.D. Application Form", {
              align: "center",
            });

          pdfDoc.moveDown();
          // Personal Info
          const profileImg = await fetchImage(`${profile}`);
          pdfDoc
            .image(profileImg, 430, 150, {
              fit: [100, 100],
              align: "center",
              valign: "center",
            })
            .stroke();

          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(11)
            .text(
              `Ph.D. Programme Type:    ${
                phdType == 1 ? "FULL - TIME" : "PART - TIME"
              }`
            )
            .text(`Ph.D. Programme Under:    ${facultyPhD}`)
            .text(`Department Name:    ${deptPhD}`)
            .text(`Applicant Name:    ${name}`)
            .text(`Gender:    ${gender}`)
            .text(`Address:`);
          pdfDoc.moveDown();
          pdfDoc.text(`${address}, ${city} - ${pinCode}, ${states}, INDIA`, {
            width: 300,
            align: "justify",
          });

          // line break
          // Academic Details
          pdfDoc.moveDown();
          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(13)
            .text("ACADEMIC INFORMATION:", { height: 100 });
          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(11)
            .text(
              `${
                academics == 1
                  ? "I have completed my Master Degree with > 60%"
                  : "I am waiting for the result. Last three semester marksheets: "
              }`
            );

          pdfDoc.moveDown();
          const table = {
            headers: [
              // if academics == 1, only 1 row else 3 rows
              "#",
              // {
              //   label: "Qualifying Degree Name",
              //   property: "pname",
              //   width: 100,
              // },
              "Qualifying Degree Name",
              "Board/University",
              "Year of Passing",
              "% of Marks or CGPA",
            ],
            // datas: [{ pname: `${degreeName}` }],
            rows: [
              [
                "1",
                "BTECH",
                "CHARUSAT",
                "2023",
                "9.0",
                // `${degreeName}`,
                // `${universityName}`,
                // `${yearOfPassing}`,
                // `${score}`,
              ],
            ],
            options: {
              width: 300,
            },
          };

          pdfDoc.table(table, {
            // A4 595.28 x 841.89 (portrait) (about width sizes)
            width: 300,
            //columnsSize: [ 200, 100, 100 ],
          });

          // Line break
          // Net Exam Info
          pdfDoc
            .moveDown()
            .font("Times-Roman", "Bold")
            .fontSize(13)
            .text("NET EXAM INFORMATION:");

          const table1 = {
            // only if net == 1
            headers: ["#", "Name as in Exam", "Score", "Validity"],
            // datas: [{ pname: `${degreeName}` }],
            rows: [
              [
                "1",
                "Jayesh",
                "99.4",
                "2023",
                // `${nameAsInExam}`,
                // `${scoreAsInExam}`,
                // `${validity}`,
              ],
            ],
            options: {
              width: 300,
            },
          };

          pdfDoc.table(table1, {
            width: 300,
          });

          // line break
          // final declaration
          pdfDoc
            .moveDown()
            .font("Times-Roman", "Bold")
            .fontSize(13)
            .text(
              "I declare that all the information provided by me in the application is true to the best of my knowledge and belief. I understand that I am liable for prosecution if any of the information is found to be false at any time in future."
            );

          // signature with image
          const signImg = await fetchImage(`${signature}`);
          pdfDoc
            .image(signImg, 420, 580, {
              fit: [100, 100],
              align: "center",
              valign: "center",
            })
            .stroke();

          pdfDoc
            .moveDown(14)
            .font("Times-Roman", "Bold")
            .fontSize(13)
            .text("Signature of the Applicant", { align: "right" });

          // Second page
          pdfDoc.addPage();
          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(14)
            .text("Detail of Academic Record:", { align: "left" });
          // console.log();
          const proofImg = await fetchImage(`${req.body.proof}`);
          pdfDoc
            .image(proofImg, 60, 100, {
              width: 500,
            })
            .stroke();

          // Transcation Details
          pdfDoc.addPage();
          pdfDoc
            .font("Times-Roman", "Bold")
            .fontSize(14)
            .text(`Transaction ID: ${tId}`, { align: "left" })
            .text(`Transaction Date: ${tDate}`, { align: "left" })
            .text(`Amount Paid: 1500`, { align: "left" });
          const trImg = await fetchImage(`${tImg}`);
          pdfDoc
            .image(trImg, 60, 150, {
              align: "center",
              valign: "center",
              width: "500",
            })
            .stroke();

          pdfDoc.end();
          console.log("pdf generated successfully!!");

          sendEmail(
            userEmail.email,
            "Congratulations, You have successfully applied for the PhD Program",
            "Here is what we have received from you!",
            "Application PDF",
            "Thank You!"
          );
          console.log("Confirmation Mail sent successfully");
        }

        console.log("Application Generated Successfully!");
        res.status(201).json({ msg: "Application Processed Successfully!" });
      } else {
        return res.status(500).json({
          msg: "You are not a candidate",
        });
      }
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },

  // update draft
  submitApplication: async (req, res) => {
    const user = await Candidate.findOne({ userId: req.user.id });

    if (!user)
      return res
        .status(409)
        .json({ msg: "You have not applied for any course!!" });

    if (user.draft == 0)
      // already submitted
      return res
        .status(409)
        .json({ msg: "You have already submitted the application" });

    const {
      tId,
      tDate,
      tImg,
      phdType,
      facultyPhD,
      deptPhD,
      name,
      profile,
      gender,
      address,
      city,
      state,
      pinCode,
      academics,
      netExam,
      signature,
      draft,
    } = req.body;

    await Candidate.findOneAndUpdate(
      { userId: req.user.id },
      {
        tId,
        tDate,
        tImg,
        phdType: phdType == 1 ? "FULL - TIME" : "PART - TIME",
        facultyPhD,
        deptPhD,
        name,
        profile,
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
        signature,
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
        const { degreeName, universityName, yearOfPassing, score, proof } =
          req.body;
        const newDegree = new Degree({
          userId: req.user.id,
          degreeName,
          universityName,
          yearOfPassing,
          score,
          proof,
          count: 0,
        });
        await newDegree.save();

        // delete last 3 sem marksheet uploaded
        await Degree.findOneAndDelete({ userId: req.user.id, count: 1 });
        await Degree.findOneAndDelete({ userId: req.user.id, count: 2 });
        await Degree.findOneAndDelete({ userId: req.user.id, count: 3 });
      } else {
        // if marksheet is already present with percentage > 60%
        const { degreeName, universityName, yearOfPassing, score, proof } =
          req.body;
        await Degree.findOneAndUpdate(
          { userId: req.user.id, count: 0 },
          {
            degreeName,
            universityName,
            yearOfPassing,
            score,
            proof,
          }
        );
      }
    } else {
      // last 3 marksheets
      const {
        degreeName,
        universityName,
        yearOfPassing,
        score,
        proof,
        degreeName2,
        universityName2,
        yearOfPassing2,
        score2,
        proof2,
        degreeName3,
        universityName3,
        yearOfPassing3,
        score3,
        proof3,
      } = req.body;

      // if option changed at the end to enter new last 3 marksheets
      const checkNew = await Degree.findOne({ userId: req.user.id, count: 1 });
      // here deletion of final marksheet is not required as a user who upload final marksheet will never
      // change the option to upload last 3 marksheet
      if (!checkNew) {
        // even this is not required
        const newDegree1 = new Degree({
          userId: req.user.id,
          degreeName: degreeName,
          universityName: universityName,
          yearOfPassing: yearOfPassing,
          score: score,
          proof: proof,
          count: 1,
        });
        const newDegree2 = new Degree({
          userId: req.user.id,
          degreeName: degreeName2,
          universityName: universityName2,
          yearOfPassing: yearOfPassing2,
          score: score2,
          proof: proof2,
          count: 2,
        });
        const newDegree3 = new Degree({
          userId: req.user.id,
          degreeName: degreeName3,
          universityName: universityName3,
          yearOfPassing: yearOfPassing3,
          score: score3,
          proof: proof3,
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
            degreeName: degreeName,
            universityName: universityName,
            yearOfPassing: yearOfPassing,
            score: score,
            proof: proof,
          }
        );
        await Degree.findOneAndUpdate(
          { userId: req.user.id, count: 2 },
          {
            degreeName: degreeName2,
            universityName: universityName2,
            yearOfPassing: yearOfPassing2,
            score: score2,
            proof: proof2,
          }
        );
        await Degree.findOneAndUpdate(
          { userId: req.user.id, count: 3 },
          {
            degreeName: degreeName3,
            universityName: universityName3,
            yearOfPassing: yearOfPassing3,
            score: score3,
            proof: proof3,
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

    // generate PDF
    const userEmail = await Users.findById({ _id: req.user.id });
    if (draft == 0) {
      let pdfDoc = new PDFDocument();
      pdfDoc.pipe(
        fs.createWriteStream(`${name}_CHARUSAT-PHD-2022-${user._id}.pdf`)
      );

      // Date
      var datetime = new Date();
      let date = ("0" + datetime.getDate()).slice(-2);
      let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
      let year = datetime.getFullYear();
      pdfDoc
        .font("Times-Roman")
        .fontSize(10)
        .text(`Application-ID: CHARUSAT-PHD-2022-${user._id}`, {
          align: "left",
          continued: true,
          lineGap: 2,
        })
        .text(`Date: ${date}/${month}/${year}`, {
          align: "right",
        });

      // University Details
      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(14)
        .text("CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY", {
          align: "center",
          lineGap: 2,
        });

      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(10)
        .text(
          "CHARUSAT CAMPUS-Changa, Off.Nadiad -Petlad Highway, Gujarat- 388421",
          {
            align: "center",
          }
        );

      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(10)
        .text("Ph# +91-2697-265011,265021 Fax# +91-2697-265007", {
          align: "center",
        });

      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(10)
        // .fillColor("blue")
        .text("E-mail:admission.phd@charusat.ac.in. web: www.charusat.ac.in", {
          align: "center",
          // link: "www.charusat.ac.in",
          lineGap: 2,
        });

      // line break
      pdfDoc.lineTo(100, 160).stroke();

      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(14)
        .text("Ph.D. Application Form", {
          align: "center",
        });

      pdfDoc.moveDown();
      // Personal Info
      const profileImg = await fetchImage(`${profile}`);
      pdfDoc
        .image(profileImg, 430, 150, {
          fit: [100, 100],
          align: "center",
          valign: "center",
        })
        .stroke();

      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(11)
        .text(
          `Ph.D. Programme Type:    ${
            phdType == 1 ? "FULL - TIME" : "PART - TIME"
          }`
        )
        .text(`Ph.D. Programme Under:    ${facultyPhD}`)
        .text(`Department Name:    ${deptPhD}`)
        .text(`Applicant Name:    ${name}`)
        .text(`Gender:    ${gender}`)
        .text(`Address:`);
      pdfDoc.moveDown();
      pdfDoc.text(`${address}, ${city} - ${pinCode}, ${state}, INDIA`, {
        width: 300,
        align: "justify",
      });

      // line break
      // Academic Details
      pdfDoc.moveDown();
      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(13)
        .text("ACADEMIC INFORMATION:", { height: 100 });
      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(11)
        .text(
          `${
            academics == 1
              ? "I have completed my Master Degree with > 60%"
              : "I am waiting for the result. Last three semester marksheets: "
          }`
        );

      pdfDoc.moveDown();
      const table = {
        headers: [
          // if academics == 1, only 1 row else 3 rows
          "#",
          // {
          //   label: "Qualifying Degree Name",
          //   property: "pname",
          //   width: 100,
          // },
          "Qualifying Degree Name",
          "Board/University",
          "Year of Passing",
          "% of Marks or CGPA",
        ],
        // datas: [{ pname: `${degreeName}` }],
        rows: [
          [
            "1",
            "BTECH",
            "CHARUSAT",
            "2023",
            "9.0",
            // `${degreeName}`,
            // `${universityName}`,
            // `${yearOfPassing}`,
            // `${score}`,
          ],
        ],
        options: {
          width: 300,
        },
      };

      pdfDoc.table(table, {
        // A4 595.28 x 841.89 (portrait) (about width sizes)
        width: 300,
        //columnsSize: [ 200, 100, 100 ],
      });

      // Line break
      // Net Exam Info
      pdfDoc
        .moveDown()
        .font("Times-Roman", "Bold")
        .fontSize(13)
        .text("NET EXAM INFORMATION:");

      const table1 = {
        // only if net == 1
        headers: ["#", "Name as in Exam", "Score", "Validity"],
        // datas: [{ pname: `${degreeName}` }],
        rows: [
          [
            "1",
            "Jayesh",
            "99.4",
            "2023",
            // `${nameAsInExam}`,
            // `${scoreAsInExam}`,
            // `${validity}`,
          ],
        ],
        options: {
          width: 300,
        },
      };

      pdfDoc.table(table1, {
        width: 300,
      });

      // line break
      // final declaration
      pdfDoc
        .moveDown()
        .font("Times-Roman", "Bold")
        .fontSize(13)
        .text(
          "I declare that all the information provided by me in the application is true to the best of my knowledge and belief. I understand that I am liable for prosecution if any of the information is found to be false at any time in future."
        );

      // signature with image
      const signImg = await fetchImage(`${signature}`);
      pdfDoc
        .image(signImg, 420, 580, {
          fit: [100, 100],
          align: "center",
          valign: "center",
        })
        .stroke();

      pdfDoc
        .moveDown(14)
        .font("Times-Roman", "Bold")
        .fontSize(13)
        .text("Signature of the Applicant", { align: "right" });

      // Second page
      pdfDoc.addPage();
      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(14)
        .text("Detail of Academic Record:", { align: "left" });
      // console.log();
      const proofImg = await fetchImage(`${req.body.proof}`);
      pdfDoc
        .image(proofImg, 60, 100, {
          width: 500,
        })
        .stroke();

      // Transcation Details
      pdfDoc.addPage();
      pdfDoc
        .font("Times-Roman", "Bold")
        .fontSize(14)
        .text(`Transaction ID: ${tId}`, { align: "left" })
        .text(`Transaction Date: ${tDate}`, { align: "left" })
        .text(`Amount Paid: 1500`, { align: "left" });
      const trImg = await fetchImage(`${tImg}`);
      pdfDoc
        .image(trImg, 60, 150, {
          align: "center",
          valign: "center",
          width: "500",
        })
        .stroke();

      pdfDoc.end();
      console.log("pdf generated successfully!!");

      sendEmail(
        userEmail.email,
        "Congratulations, You have successfully applied for the PhD Program",
        "Here is what we have received from you!",
        "Application PDF",
        "Thank You!"
      );
      console.log("Confirmation Mail sent successfully");
    }

    // send email of submitted application containing PDF
    res.status(201).json({ msg: "Application Processed Successfully!" });
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

  // get draft field
  getField: async (req, res) => {
    try {
      const { userId } = req.params.id;
      const application = await Candidate.findOne({
        userId: req.params.id,
      }).exec();

      if (!application)
        return res.status(409).json({
          msg: "You have not submitted any application",
        });
      // console.log(application);

      console.log("Fetched Data Successfully!");

      return res.status(201).json(application.draft);
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },
};

async function fetchImage(src) {
  const image = await axios.get(src, {
    responseType: "arraybuffer",
  });
  return image.data;
}

module.exports = candidateCtrl;
