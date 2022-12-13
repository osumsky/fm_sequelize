const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const UserController = require('../controllers/user.controller');
const user = require('../models/user');

const userRouter = Router();

userRouter.post('/user', UserController.createUser);
userRouter.get('/users', UserController.getAllUsers);

userRouter
  .route('/user/:id')
  .delete(UserController.deleteUser)
  .patch(UserController.updateUser);

userRouter
  .route('/user-v2/:id')
  .patch(UserController.updateUserInstance)
  .delete(UserController.deleteUserInstance);

userRouter.post('/user/:id/task', TaskController.createTask);

module.exports = userRouter;
