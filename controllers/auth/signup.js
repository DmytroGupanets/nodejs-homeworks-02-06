const { sendResponse } = require("../../helpers");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });

  if (result) {
    sendResponse({
      res,
      status: 409,
      statusMessage: "Conflict",
      data: { message: "Email in use" },
    });
    return;
  }

  const newUser = new User({ email });

  newUser.setPassword(password);

  await newUser.save();

  sendResponse({
    res,
    status: 201,
    statusMessage: "Created",
    data: {
      message: "Registration success",
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
