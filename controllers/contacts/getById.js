const { NotFound } = require("http-errors");
const contactsOperation = require("../../model/index");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.getContactById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({ status: "success", code: 200, data: contact });
};

module.exports = getById;
