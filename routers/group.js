const { Router } = require('express');
const GroupController = require('../controllers/group.controller');

const groupRouter = Router();

groupRouter
  .route('/')
  .post(GroupController.createUserGroup);

  groupRouter
  .route('/:userId')
  .get(GroupController.getGroupsByUser);

module.exports = groupRouter;
