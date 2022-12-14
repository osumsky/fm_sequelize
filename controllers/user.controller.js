const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    // Method .create sequelize takes from Model
    const returnedUser = await User.create(body);
    createdUser = returnedUser.get();
    createdUser.password = undefined;
    res.status(201).send({ data: createdUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const users = await User.findAll({
      where: {},
      attributes: { exclude: ['password'] },
      ...pagination,
    });
    res.status(200).send({ data: users });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const [rows, [updatedUser]] = await User.update(body, {
      where: { id },
      returning: true,
    });
    updatedUser.password = undefined;
    res.status(202).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const updatedUser = await userInstance.update(body, {
      returning: true,
    });
    updatedUser.password = undefined;
    res.status(202).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      body: { userId },
    } = req;
    const deletedUser = await User.delete(userId);
    res.status(201).send(`user with id=${userId} deleted`);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userInstance = await User.findByPk(userId);
    if (userInstance) {
      const deletedUser = await userInstance.destroy({ returning: true });
      deletedUser.password = undefined;
      res.status(201).send(`user with id=${userId} deleted`);
    } else {
      res.status(404).send(`User with id=${id} not found`);
    }
  } catch (err) {
    next(err);
  }
};
