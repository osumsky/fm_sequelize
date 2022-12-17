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

module.exports.createImageForGroup = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { groupId },
    } = req;

    const [count, [updatedGroup]] = await Group.update(
      { imagePath: filename },
      { where: { id: groupId }, returning: true }
    );

    res.send(req.file);
  } catch (err) {
    next(err);
  }
};

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
      body: { userId },
    } = req;
    const group = await Group.findByPk(groupId);
    if (!group) {
      next(createError(404, 'Group not found'));
    }
    const user = await User.findByPk(userId);
    if (!user) {
      next(createError(404, 'User not found'));
    }
    await group.addUser(user);

    const groupWithUsers = await Group.findByPk(groupId, {
      attributes: { exclude: ['password'] },
      include: [{ model: User, through: { attributes: [] } }],
    });

    res.status(201).send(groupWithUsers);
  } catch (err) {
    next(err);
  }
};
