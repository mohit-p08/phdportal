const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
Schema = mongoose.Schema;

const candidateSchema = mongoose.Schema(
  {
    _id: Number,
    email: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    tId: {
      // transaction ID
      type: String,
    },
    tDate: {
      // transaction date
      type: String,
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
    },
    facultyPhD: {
      // Faculty for PhD Programme
      type: String, // 0 -> FTE, 1 -> FCSA, 2 -> FAS, 3 -> FMS(Management), 4 -> FMS(Medical), 5 -> FP
    },
    deptPhD: {
      // Department as per the faculty chosen
      type: String, // number is assigned as per the dept selected
    },
    name: {
      // candidate's name
      type: String,
    },
    profile: {
      type: String,
      default:
        "https://res.cloudinary.com/mohitmernproject/image/upload/v1633200894/samples/bike.jpg",
    },
    gender: {
      // candidate's gender
      type: String, // 0 -> Male, 1 -> Female, 2 -> transgender
    },
    address: {
      // candidate's address line 1 and 2
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pinCode: {
      type: Number,
      // min: 6,
      // max: 7,
    },
    academics: {
      type: String,
    },
    netExam: {
      type: String,
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
    status: {
      type: Number,
      default: 0, // 0 -> pending, 1 -> approve, 2 -> reject
    },
    emailStatus: {
      type: Number,
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
