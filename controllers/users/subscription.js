const { sendResponse } = require("../../helpers");
const { User } = require("../../models");

const subscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription: subscription },
    {
      new: true,
    }
  );

  sendResponse({
    res,
    data: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = subscription;
