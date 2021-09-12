const contactsOperation = require("../../model/index");

const getAll = async (req, res, next) => {
  const contacts = await contactsOperation.listContacts();

  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = getAll;
