const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
Schema = mongoose.Schema;

const candidateSchema = mongoose.Schema(
  {
    _id: Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    tId: {
      // transaction ID
      type: String,
      required: true,
    },
    tDate: {
      // transaction date
      type: Date,
      required: true,
    },
    tAmt: {
      // transaction amount which is fixed = 1500 rs.
      type: Number,
      default: 1500,
    },
    tImg: {
      // transaction proof via img
      type: String,
      default:
        "https://res.cloudinary.com/mohitmernproject/image/upload/v1633200894/samples/bike.jpg",
    },
    phdType: {
      // PhD type
      type: String, // 0 -> part time, 1 -> full time
      required: true,
    },
    facultyPhD: {
      // Faculty for PhD Programme
      type: String, // 0 -> FTE, 1 -> FCSA, 2 -> FAS, 3 -> FMS(Management), 4 -> FMS(Medical), 5 -> FP
      required: true,
    },
    deptPhD: {
      // Department as per the faculty chosen
      type: String, // number is assigned as per the dept selected
      required: true,
    },
    name: {
      // candidate's name
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default:
        "https://res.cloudinary.com/mohitmernproject/image/upload/v1633200894/samples/bike.jpg",
    },
    gender: {
      // candidate's gender
      type: String, // 0 -> Male, 1 -> Female, 2 -> transgender
      required: true,
    },
    address: {
      // candidate's address line 1 and 2
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
      // min: 6,
      // max: 7,
    },
    academics: {
      type: String,
      required: true,
    },
    netExam: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      default:
        "https://res.cloudinary.com/mohitmernproject/image/upload/v1633200894/samples/bike.jpg",
    },
    draft: {
      type: Number, // 0 -> final, 1 -> draft
      default: 0,
    },
  },
  {
    timestamps: true,
  },
  {
    _id: false,
  }
);

candidateSchema.plugin(autoIncrement);

module.exports = mongoose.model("Candidate", candidateSchema, "tblCandidate");
