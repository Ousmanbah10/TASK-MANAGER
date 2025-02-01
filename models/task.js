const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide string"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 chars"],
  },
  completed: { type: Boolean, defualt: false },
});

module.exports = mongoose.model("Task", TaskSchema);
