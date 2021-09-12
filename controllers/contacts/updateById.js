const { NotFound } = require("http-errors");

const contactsOperation = require("../../model/index");

const updateById = async (req, res) => {
  const contact = await contactsOperation.updateContact(req.params, req.body);

  if (!contact) {
    throw new NotFound(`Contact with id=${req.params.contactId} not found!`);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = updateById;
