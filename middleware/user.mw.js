const { User } = require('../models');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userInstance = await User.findByPk(userId);
    // console.log(userInstance);
    if (!userInstance) {
      throw new Error(`User with id=${userId} not found`);
    }
    req.userInstance = userInstance;
    next();
  } catch (err) {
    next(err);
  }
};
