const { Contact } = require("../../models/contact")
const { sendResponse } = require("../../helpers")
const { NotFound } = require("http-errors")

const updateById = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  )

  if (!contact) {
    throw new NotFound(`Contact with id=${req.params.contactId} not found!`)
  }

  sendResponse({
    res,
    data: { contact, message: "Contact updated" },
    status: 200
  })
}

module.exports = updateById
