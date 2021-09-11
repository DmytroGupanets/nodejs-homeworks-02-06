const { BadRequest } = require("http-errors");

const validation = (scheme) => {
  const func = (req, res, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: error.message,
      });
    }
    next();
  };
  return func;
};

module.exports = validation;
