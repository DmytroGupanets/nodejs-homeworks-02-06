const sendSuccessReq = (res, data, status = 200, message) => {
  res.status(201).json({
    status: "success",
    code: status,
    data,
    message,
  });
};

module.exports = sendSuccessReq;
