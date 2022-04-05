const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const Users = require("../model/userModel");

const { CLIENT_URL } = process.env;

const userCtrl = {
  // creates new account
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(409).json({ msg: "Please fill all fields" });

      if (!validateEmail(email))
        return res.status(409).json({
          msg: "Invalid email! Please enter valid email",
        });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(409).json({
          msg: "An account is already associated with this email",
        });

      //   if (!validatePassword(password))
      //     return res
      //       .status(409)
      //       .json({ msg: "Please satisfy password constraints" });

      const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt level

      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      // await newUser.save();

      // email verification
      const activation_token = createActivationToken(newUser);
      // console.log(activation_token);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      // console.log(url);
      sendMail(
        email,
        url,
        "Verify your email address",
        "Congratulations! You're almost set to apply for PhD. Just click the button below to validate your email address."
      );
      console.log("New account email sent");
      res.status(201).json({
        msg: "Account has been created successfully, please verify your email :)",
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  // email activation
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;

      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res
          .status(400)
          .json({ msg: "This email already exists! Try again." });

      const newUser = new Users({
        name,
        email,
        password,
      });

      await newUser.save();

      console.log("Account has been activated!");
      res.json({ msg: "Account has been activated!" });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  // login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        res.status(409).json({ msg: "Please fill all fields!!" });

      if (!validateEmail(email))
        res.status(409).json({ msg: "Please enter valid email address" });

      const user = await Users.findOne({ email });
      if (!user) res.status(409).json({ msg: "Invalid Id or Password" });

      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck)
        res.status(409).json({ msg: "Invalid Id or Password" });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      console.log("logged in an account");
      res.status(201).json({ msg: "Successfully logged you in :)" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // generates access token
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(409).json({ msg: "Please login again!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(409).json({ msg: "Please login again!" });

        const access_token = createAccessToken({ id: user.id });
        console.log("access token generated");
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // change password
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      console.log("Password was changed");
      res.json({ msg: "Password changed successfully!" });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },

  // logout
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", {
        path: "/user/refresh_token",
      });
      console.log("logged out an account");
      res.json({
        msg: "Successfully logged out!",
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },

  // forgot password
  forgotpassword: async (req, res) => {
    const { email } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      res.status(409).json({
        msg: "Account does not exist with given email",
      });

    const access_token = createAccessToken({ id: user._id });

    // const url = `${CLIENT_URL}/user/resetpassword/${access_token}`;

    // sendMail(
    //   email,
    //   url,
    //   "Change your password",
    //   "Congratulations! You can now change you password. Just click on the below button"
    // );

    res.json({ msg: "Please check your email to change the password." });
  },
};

// validate email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// validate password - Minimum eight characters, at least one letter, one number and one special character
function validatePassword(password) {
  const re = /"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/;
  return re.test(password);
}

// creates access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

// activation token
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

// creates refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
