const { Router } = require('express');
const GroupController = require('../controllers/group.controller');

const multer = require('multer');

// const upload = multer({dest:'uploads/'});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage, limits: { fileSize: 2048 } });

const groupRouter = Router();

groupRouter.route('/').post(GroupController.createUserGroup);

groupRouter.route('/:userId').get(GroupController.getGroupsByUser);

groupRouter
  .route('/:groupId/image')
  .post(upload.single('image'), GroupController.createImageForGroup);

module.exports = groupRouter;
