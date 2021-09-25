const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const {
  controllerWrapper,
  authenticate,
  validation,
} = require("../../midllewares");
const { joiUserSubscriptionUpdateSchema } = require("../../models");

router.patch(
  "/",
  authenticate,
  validation(joiUserSubscriptionUpdateSchema),
  controllerWrapper(ctrl.subscription)
);

router.post("/current", authenticate, controllerWrapper(ctrl.userInfo));

module.exports = router;