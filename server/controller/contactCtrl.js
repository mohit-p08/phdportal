const requestsendMail = require("./requestSendMail");

const contactCtrl = {
  // send query/suggestion recieved from front end to admin via email
  postRequest: async (req, res) => {
    try {
      const { name, email, title, description } = req.body;

      const admin = "mohitprajapati11069@gmail.com";
      requestsendMail(
        admin,
        "Congratulations! You have received a new suggestion/query.",
        `FROM: ${name} (${email})`,
        `Title: ${title}`,
        `Description: ${description} Thank You!`
      );

      console.log("Query Received");
      res.json({ msg: "Your query has been sent successfully. Thank You!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = contactCtrl;
