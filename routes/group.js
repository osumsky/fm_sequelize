const { Router } = require('express');
const GroupController = require('../controllers/group.controller');
const path = require('path');
const multer = require('multer');

// const upload = multer({ dest: path.resolve(__dirname, '../public/images') });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

const groupRouter = Router();
groupRouter.post('/', GroupController.createGroup);
groupRouter.get('/:userId', GroupController.getGroupsByUser);
groupRouter.post(
  '/:groupId/image',
  upload.single('image'),
  GroupController.createImageForGroup
);

module.exports = groupRouter;
