const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    task: String,
    status: String,
    date: Date
})

const taskModel = mongoose.model("tasks",taskSchema);

module.exports = taskModel;