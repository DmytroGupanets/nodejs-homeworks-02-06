const contactsOperation = require("../../model/index");

const add = async (req, res) => {
  const contact = await contactsOperation.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
  });
};

module.exports = add;
