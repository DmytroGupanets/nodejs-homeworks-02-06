const sendResponse = require("../helpers/sendResponse");

const validation = (scheme) => {
  const func = (req, res, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      sendResponse({
        res,
        status: 400,
        statusMessage: "Bad request",
        data: {
          message: error.message,
        },
      });
    }
    next();
  };
  return func;
};

module.exports = validation;
