const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const user = require('../models/user');

const userRouter = Router();

userRouter.post('/user', UserController.createUser);
userRouter.get('/users', UserController.getAllUsers);

userRouter
  .route('/user/:id')
  .delete(UserController.deleteUser)
  .patch(UserController.patchUser);

module.exports = userRouter;
