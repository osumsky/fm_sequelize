const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const UserController = require('../controllers/user.controller');
const {checkUser} = require('../middleware/user.mw');

const userRouter = Router();

userRouter.post('/user', UserController.createUser);
userRouter.get('/users', UserController.getAllUsers);

userRouter
  .route('/user/:id')
  .delete(UserController.deleteUser)
  .patch(UserController.updateUser);

userRouter
  .route('/user-v2/:id')
  .patch(checkUser, UserController.updateUserInstance)
  .delete(checkUser, UserController.deleteUserInstance);

userRouter.post('/user/:id/task', checkUser, TaskController.createTask);
userRouter.get('/user/:id/tasks', checkUser, TaskController.getUserTasks);

module.exports = userRouter;
