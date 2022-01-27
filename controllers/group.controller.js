const _ = require('lodash');
const createError = require('http-errors');
const { Group, User } = require('../models');

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ['name', 'imagePath', 'description']);
    
    const user = await User.findByPk(body.userId);

    if (!user) {
      return next(createError(404, 'User not found'));
    }
    
    const group = await Group.create({
      ...values,
    });

    await group.addUser(user);
    

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};
