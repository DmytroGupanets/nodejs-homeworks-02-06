const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const { Schema, model } = require("mongoose")
const { v4 } = require("uuid")

const joiUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business")
})

const joiUserSubscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business")
})

const joiUserVerificationRequestSchema = Joi.object({
  email: Joi.string().required()
})

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6
    },
    avatarURL: String,

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null
    },

    isVerified: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"]
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.setDefaultAvatar = function (avatar) {
  this.avatarURL = avatar
}

const { SECRET_KEY } = process.env

userSchema.methods.createToken = function () {
  const payload = {
    id: this._id
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
}

userSchema.methods.setVerifyToken = function () {
  this.verifyToken = v4()
}

const User = model("user", userSchema)

module.exports = {
  User,
  joiUserSchema,
  joiUserSubscriptionUpdateSchema,
  joiUserVerificationRequestSchema
}
