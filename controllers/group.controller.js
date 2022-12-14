const _ = require('lodash');
const { Group } = require('../models');

module.exports.createUserGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ['name', 'imagePath', 'description']);

    const group = Group.create({ ...values});


    
    res.status(201).send({ data: group });
  } catch (err) {
    next(err);
  }
};
