const { Router } = require('express');
const GroupController = require('../controllers/group.controller');

const groupRouter = Router();

groupRouter
  .route('/')
  .post(GroupController.createUserGroup)
  // .get(TaskController.getUserTasks);

module.exports = groupRouter;
