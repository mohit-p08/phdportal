require("dotenv").config();
const connection = require("./dbConnection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());

// Routes
app.use("/user", require("./router/userRouter"));
app.use("/application", require("./router/candidateRouter"));
app.use("/dean", require("./router/deanRouter"));
app.use("/admin", require("./router/adminRouter"));
app.use("/accountant", require("./router/accountantRouter"));

// DB connection
connection();

// Port
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
