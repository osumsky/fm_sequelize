const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { checkUser } = require('../middleware/user.mw');

const userRouter = Router();

userRouter
  .route('/')
  .post(UserController.createUser)
  .get(UserController.getAllUsers);

userRouter
  .route('/:userId')
  .delete(UserController.deleteUser)
  .patch(UserController.updateUser);

userRouter
  .route('/v2/:userId')
  .patch(checkUser, UserController.updateUserInstance)
  .delete(checkUser, UserController.deleteUserInstance);

module.exports = userRouter;