const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { controllerWrapper, validation } = require("../../midllewares");
const { joiContactScheme, joiContactUpdateScheme } = require("../../schemes");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(joiContactScheme), controllerWrapper(ctrl.add));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.patch(
  "/:contactId",
  validation(joiContactUpdateScheme),
  controllerWrapper(ctrl.updateById)
);

module.exports = router;
