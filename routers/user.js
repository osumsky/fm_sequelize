const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { pagination } = require('../middleware/paginate.mw');
const { checkUser } = require('../middleware/user.mw');

const userRouter = Router();

userRouter
  .route('/')
  .post(UserController.createUser)
  .get(pagination, UserController.getAllUsers);

userRouter
  .route('/:userId')
  .delete(UserController.deleteUser)
  .patch(UserController.updateUser);

userRouter
  .route('/v2/:userId')
  .patch(checkUser, UserController.updateUserInstance)
  .delete(checkUser, UserController.deleteUserInstance);

module.exports = userRouter;
