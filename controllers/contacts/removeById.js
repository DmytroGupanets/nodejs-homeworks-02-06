const { Contact } = require("../../models/contact");
const { sendResponse } = require("../../helpers");
const { NotFound } = require("http-errors");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  sendResponse(res, { contact }, 201, "Contact deleted");
};

module.exports = removeById;
