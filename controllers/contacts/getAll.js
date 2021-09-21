const { Contact } = require("../../models/contact");
const { sendSuccessReq } = require("../../helpers");

const getAll = async (req, res) => {
  const contacts = await Contact.find({});

  sendSuccessReq(res, { contacts });
};

module.exports = getAll;
