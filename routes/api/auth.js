const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../midllewares");
const { joiUserSchema } = require("../../models");

router.post(
  "/signup",
  validation(joiUserSchema),
  controllerWrapper(ctrl.signup)
);

router.post(
  "/signin",
  validation(joiUserSchema),
  controllerWrapper(ctrl.signin)
);

router.post("/signout", authenticate, controllerWrapper(ctrl.signout));

module.exports = router;
