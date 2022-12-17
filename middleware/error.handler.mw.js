
module.exports = async (err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'Internal server error';
  res.status(errStatus).end(errMessage);
};
