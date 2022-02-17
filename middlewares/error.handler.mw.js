const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports.sequelizeHandlerError = async (err, req, res, next) => {
  // console.log('==== EROR', err);
  if (err instanceof UniqueConstraintError) {
    return res.status(409).send(err);
  }

  if (err instanceof ValidationError) {
    return res.status(400).send(err);
  }
  next(err);
};

module.exports.basicHandlerError = async (err, req, res, next) => {
  // console.log('==== EROR', err);
  const statusError = err.status || 500;

  res.status(statusError).send({
    errors: [{ message: err.message || 'Internal Server Error' }],
  });
};

