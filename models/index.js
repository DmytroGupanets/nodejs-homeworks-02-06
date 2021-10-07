const { Contact } = require("./contact")
const { joiContactScheme } = require("./contact")
const { joiContactUpdateScheme } = require("./contact")

const { User } = require("./user")
const { joiUserSchema } = require("./user")
const { joiUserSubscriptionUpdateSchema } = require("./user")
const { joiUserVerificationRequestSchema } = require("./user")

const Avatar = require("./avatar")

module.exports = {
  Contact,
  joiContactScheme,
  joiContactUpdateScheme,
  User,
  joiUserSchema,
  joiUserSubscriptionUpdateSchema,
  joiUserVerificationRequestSchema,

  Avatar
}
