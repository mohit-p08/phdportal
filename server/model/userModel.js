const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    flag: {
      type: Number,
      default: 0, // 0 -> normal user, 1 -> dean, 2 -> admin, 3 -> accountant
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema, "tblUsers");
