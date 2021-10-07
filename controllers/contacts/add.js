const { Contact } = require("../../models/contact")
const { sendResponse } = require("../../helpers")

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const contact = await Contact.create(newContact)
  await contact.populate("owner", "_id email")

  sendResponse({ res, data: { contact }, status: 201 })
}

module.exports = add
