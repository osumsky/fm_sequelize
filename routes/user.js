const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/user.mw');

const userRouter = Router();
userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
//userRouter.get('/', UserController.getlUser);
userRouter.patch('/:userId', UserController.updateUser);
userRouter.patch('/v2/:userId', checkUser, UserController.updateUserInstance);
//userRouter.delete('/:userId', checkUser, UserController.deleteUser);

module.exports = userRouter;
