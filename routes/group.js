const { Router } = require('express');
const GroupController = require('../controllers/group.controller');

const groupRouter = Router();
groupRouter.post('/', GroupController.createGroup);

module.exports = groupRouter;
