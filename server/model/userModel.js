const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    flag: {
      type: Number,
      default: 0, // 0 -> normal user, 1 -> dean, 2 -> admin, 3 -> accountant
    },
    done: {
      type: Number,
      default: 0,
    },
    post: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema, "tblUsers");
