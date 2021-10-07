const { Contact } = require("../../models/contact")
const { sendResponse } = require("../../helpers")

const getAll = async (req, res) => {
  const { page = 1, limit = 20, favorite = false } = req.query

  const skip = (page - 1) * limit
  let contacts

  if (!favorite) {
    contacts = await Contact.find({ owner: req.user._id }, "", {
      skip,
      limit: +limit
    }).populate("owner", "_id email")
  } else {
    contacts = await Contact.find(
      { owner: req.user._id, favorite: favorite },
      "",
      {
        skip,
        limit: +limit
      }
    ).populate("owner", "_id email")
  }

  sendResponse({ res, data: { contacts }, status: 200 })
}

module.exports = getAll
