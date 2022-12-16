const _ = require('lodash');
const { Group, User } = require('../models');
const createError = require('http-errors');

module.exports.createUserGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ['name', 'imagePath', 'description']);
    const user = await User.findByPk(body.userId);
    if (!user) {
      next(createError(404, 'User not found'));
    }
    const group = await Group.create({ ...values });
    await group.addUser(user);
    res.status(201).send({ data: group });
  } catch (err) {
    next(err);
  }
};

module.exports.getGroupsByUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userWithGroups = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Group, through: { attributes: [] } }],
    });
    if (!userWithGroups) {
      next(createError(404, 'User not found'));
    }
    res.status(200).send({ data: userWithGroups });
  } catch (err) {
    next(err);
  }
};
