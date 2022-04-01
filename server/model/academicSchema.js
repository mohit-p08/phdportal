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
    certificate: {
      type: String,
      default:
        "https://res.cloudinary.com/mohitmernproject/image/upload/v1633200894/samples/bike.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Academic", academicSchema, "tblAcademic");
