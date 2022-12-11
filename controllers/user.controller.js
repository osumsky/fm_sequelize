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
    const where = req.query;
    const users = await User.findAll({
      where,
      attributes: { exclude: ['password'] },
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
    const {
      body,
      params: { id },
    } = req;
    const userInstance = await User.findByPk(id);
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
      body: { id },
    } = req;
    const deletedUser = await User.delete(id);
    if (deletedUser) res.status(201).send(deletedUser);
    else res.status(400).send('Error on deleting user');
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const userInstance = await User.findByPk(id);
    if (userInstance) {
      const deletedUser = await userInstance.destroy({ returning: true });
      deletedUser.password = undefined;
      res.status(201).send(deletedUser);
    } else {
      res.status(404).send(`User with id=${id} not found`);
    }
  } catch (err) {
    next(err);
  }
};
