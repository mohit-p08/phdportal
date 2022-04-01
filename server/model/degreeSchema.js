const mongoose = require("mongoose");
Schema = mongoose.Schema;

const degreeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    degreeName: {
      type: String,
      required: true,
    },
    universityName: {
      type: String,
      required: true,
    },
    yearOfPassing: {
      type: Number,
      required: true,
      // min: 4,
      // max: 4,
    },
    score: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
    },
    proof: {
      type: String,
      default:
        "https://res.cloudinary.com/mohitmernproject/image/upload/v1633200894/samples/bike.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Degree", degreeSchema, "tblDegree");
