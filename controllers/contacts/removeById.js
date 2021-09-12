const { NotFound } = require("http-errors");
const contactsOperation = require("../../model/index");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.removeContact(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: { contact },
  });
};

module.exports = removeById;
