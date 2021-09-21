const { Contact } = require("../../models/contact");
const { sendSuccessReq } = require("../../helpers");

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  sendSuccessReq(res, { contact }, 201);
};

module.exports = add;
