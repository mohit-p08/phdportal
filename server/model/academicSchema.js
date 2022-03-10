const mongoose = require("mongoose");
Schema = mongoose.Schema;

const academicSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    nameAsInExam: {
      type: String,
      required: true,
    },
    scoreAsInExam: {
      type: String,
      reuired: true,
    },
    validity: {
      type: String,
      required: true,
    },
    // proof: {
    //   type: String,
    //   reuired: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Academic", academicSchema, "tblAcademic");
