const path = require("path")
const fs = require("fs/promises")
const { sendResponse } = require("../../helpers")
const Jimp = require("jimp")

const { User } = require("../../models")

const avatarsDir = path.join(__dirname, "../../", "public/avatars")

const updateAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file
  try {
    const { _id } = req.user
    await Jimp.read(tempStorage)
      .then((image) => image.cover(250, 250).write(tempStorage))
      .catch(console.log)

    const [avatarExtension] = originalname.split(".").reverse()
    const fileName = path.join(`user_avatar-image_${_id}.${avatarExtension}`)

    const uploadDir = path.join(avatarsDir, fileName)
    await fs.rename(tempStorage, uploadDir)

    const user = await User.findByIdAndUpdate(
      _id,
      { avatarURL: "/avatars/" + fileName },
      { new: true }
    )

    sendResponse({
      res,
      statusMessage: "success",
      data: {
        avatarURL: user.avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tempStorage)
    sendResponse({
      res,
      status: 404,
      statusMessage: "error",
      data: {
        error,
      },
    })
  }
}

module.exports = updateAvatar
