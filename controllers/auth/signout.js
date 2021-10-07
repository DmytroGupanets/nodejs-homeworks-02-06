const { sendResponse } = require("../../helpers")
const { User } = require("../../models")

const signout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })

  sendResponse({
    res,
    status: 204,
    statusMessage: "No content",
    data: { message: "Logout success" }
  })
}

module.exports = signout
