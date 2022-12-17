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

groupRouter.get('/:userId', GroupController.getGroupsByUser);
groupRouter.post('/', GroupController.createUserGroup);
groupRouter.post(
  '/:groupId/image',
  upload.single('image'),
  GroupController.createImageForGroup
);
groupRouter.post(':groupId', GroupController.addUserToGroup);

module.exports = groupRouter;
