const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../midllewares");
const {
  joiContactScheme,
  joiContactUpdateScheme,
} = require("../../models/contact");

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(joiContactScheme),
  controllerWrapper(ctrl.add)
);

router.delete("/:contactId", authenticate, controllerWrapper(ctrl.removeById));

router.patch(
  "/:contactId",
  authenticate,
  validation(joiContactUpdateScheme),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
