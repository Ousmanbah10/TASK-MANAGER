const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({ task });

  // res.status(500).json({ msg: error });
  // console.log("THERE WAS AN ERROR");
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return res
      .status(404)
      .json({ msg: `There is no task with this ${taskID}` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res
      .status(404)
      .json({ msg: `There is no task with this ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return res
      .status(404)
      .json({ msg: `There is no task with this ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  deleteTask,
  updateTask,
  getTask,
  createTask,
};
