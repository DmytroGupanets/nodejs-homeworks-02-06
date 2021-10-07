const { sendResponse } = require("../../helpers")

const userInfo = async (req, res) => {
  sendResponse({
    res,
    data: {
      email: req.user.email,
      subscription: req.user.subscription
    }
  })
}

module.exports = userInfo
