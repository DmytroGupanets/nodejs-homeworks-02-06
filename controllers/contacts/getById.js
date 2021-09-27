const { Contact } = require("../../models/contact");
const { sendResponse } = require("../../helpers");
const { NotFound } = require("http-errors");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  sendResponse({ res, data: { contact }, status: 200 });
};

module.exports = getById;
