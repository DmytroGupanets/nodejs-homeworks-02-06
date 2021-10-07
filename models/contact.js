const Joi = require("joi")
const { Schema, model } = require("mongoose")

const joiContactScheme = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.string().min(1).required(),
  favorite: Joi.boolean()
})

const joiContactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean()
}).or("name", "email", "phone", "favorite")

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 2
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      minLength: 5
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      minLength: 7
    },
    favorite: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const Contact = model("contact", contactSchema)

module.exports = { Contact, joiContactScheme, joiContactUpdateScheme }
