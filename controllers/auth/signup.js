const { sendResponse, sendEmail } = require("../../helpers")
const { User } = require("../../models")
const gravatar = require("gravatar")
const emailVerificationTemplate = require("../../templates/emailVerificationTemplate.js")

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user) {
    return sendResponse({
      res,
      status: 409,
      statusMessage: "Conflict",
      data: { message: "Email in use" }
    })
  }

  const newUser = new User({ email })

  newUser.setPassword(password)
  newUser.setVerifyToken()
  newUser.setDefaultAvatar(gravatar.url(newUser.email, { s: "200" }))
  const { verifyToken } = await newUser.save()

  const data = {
    to: email,
    subject: "Email verification",
    html: emailVerificationTemplate(verifyToken, email)
  }
  await sendEmail(data)

  sendResponse({
    res,
    status: 201,
    statusMessage: "Created",
    data: {
      message: "Registration success",
      email: newUser.email,
      subscription: newUser.subscription,
      verifyToken: verifyToken
    }
  })
}

module.exports = signup
