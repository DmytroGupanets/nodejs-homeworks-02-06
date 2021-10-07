const { Contact } = require("../../models/contact")
const { sendResponse } = require("../../helpers")
const { NotFound } = require("http-errors")

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body

  if (!favorite) {
    throw new NotFound("missing field favorite")
  }

  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )

  if (!contact) {
    throw new NotFound(`Contact with id=${req.params.contactId} not found!`)
  }

  sendResponse({
    res,
    data: { contact, message: "Status updated" },
    status: 200
  })
}

module.exports = updateStatusContact
