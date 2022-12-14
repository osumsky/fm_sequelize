const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const { checkUser } = require('../middleware/user.mw');

const taskRouter = Router();

taskRouter
  .route('/:userId')
  .post(checkUser, TaskController.createTask)
  .get(checkUser, TaskController.getUserTasks);

module.exports = taskRouter;
