const mongoose = require("mongoose");
Schema = mongoose.Schema;

const degreeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    degreeName: {
      type: String,
    },
    universityName: {
      type: String,
    },
    yearOfPassing: {
      type: Number,
      // min: 4,
      // max: 4,
    },
    score: {
      type: String,
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
