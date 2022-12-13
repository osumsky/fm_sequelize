const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const task = await userInstance.createTask(body);
    res.status(201).send(task);
  } catch (err) {
    next(err);
  }
};


module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks();
    res.status(200).send({data: tasks})
  } catch (err) {
    next(err);
  }
};

