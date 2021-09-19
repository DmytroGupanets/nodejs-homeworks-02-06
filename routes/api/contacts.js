const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { controllerWrapper, validation } = require("../../midllewares");
const {
  joiContactScheme,
  joiContactUpdateScheme,
} = require("../../models/contact");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(joiContactScheme), controllerWrapper(ctrl.add));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.patch(
  "/:contactId",
  validation(joiContactUpdateScheme),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
