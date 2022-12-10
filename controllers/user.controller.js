const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    // Method .create sequelize takes from Model
    const createdUser = await User.create(body);
    res.status(201).send({ data: createdUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ data: users });
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

module.exports.patchUser = async (req, res, next) => {
  try {
    const { body } = req;
    const patchedUser = await User.patch(body);
    if (patchedUser) res.status(201).send(patchedUser);
    else res.status(400).send('Error on patching user');
  } catch (err) {
    next(err);
  }
};
