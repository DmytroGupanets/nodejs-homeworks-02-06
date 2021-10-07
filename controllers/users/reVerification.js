const { sendResponse, sendEmail } = require("../../helpers")
const { User } = require("../../models")
const emailVerificationTemplate = require("../../templates/emailVerificationTemplate.js")

const reVerification = async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return sendResponse({
      res,
      status: 404,
      statusMessage: "Not Found",
      data: {
        message: "User not found"
      }
    })
  }

  const { isVerified, verifyToken } = user

  if (isVerified) {
    return sendResponse({
      res,
      status: 400,
      statusMessage: "Bad Request",
      data: {
        message: "Verification has already been passed"
      }
    })
  }

  const data = {
    to: email,
    subject: "Email verification",
    html: emailVerificationTemplate(verifyToken, email)
  }

  await sendEmail(data)

  sendResponse({
    res,
    status: 200,
    data: {
      message: "Verification email sent"
    }
  })
}

module.exports = reVerification
