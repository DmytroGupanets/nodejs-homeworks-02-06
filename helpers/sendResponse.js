const sendResponse = ({ res, data, status = 200, statusMessage }) => {
  res.status(status).json({
    status: statusMessage,
    code: status,
    data,
  });
};

module.exports = sendResponse;
