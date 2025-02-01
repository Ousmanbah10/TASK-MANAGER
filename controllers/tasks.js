const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log("THERE WAS AN ERROR");
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log("THERE WAS AN ERROR");
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res
        .status(404)
        .json({ msg: `There is no task with this ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log("THERE WAS AN ERROR");
  }
};

const updateTask = async (req, res) => {
  //  id: taskID, data: req.body
  try {
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
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log("THERE WAS AN ERROR");
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res
        .status(404)
        .json({ msg: `There is no task with this ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log("THERE WAS AN ERROR");
  }
};

module.exports = {
  getAllTasks,
  deleteTask,
  updateTask,
  getTask,
  createTask,
};
