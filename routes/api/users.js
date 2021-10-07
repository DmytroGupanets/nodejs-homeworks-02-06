const express = require("express")
const router = express.Router()
const { users: ctrl } = require("../../controllers")
const {
  controllerWrapper,
  authenticate,
  validation,
  upload
} = require("../../midllewares")
const {
  joiUserSubscriptionUpdateSchema,
  joiUserVerificationRequestSchema
} = require("../../models")

router.patch(
  "/",
  authenticate,
  validation(joiUserSubscriptionUpdateSchema),
  controllerWrapper(ctrl.subscription)
)

router.post("/current", authenticate, controllerWrapper(ctrl.userInfo))

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
)

router.get("/verify/:verifyToken", controllerWrapper(ctrl.verification))

router.post(
  "/verify",
  validation(joiUserVerificationRequestSchema),
  controllerWrapper(ctrl.reVerification)
)

module.exports = router
