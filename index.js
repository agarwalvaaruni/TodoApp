const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todoapp");

const todoSchema = new mongoose.Schema({
  task: String,
  status: String,
});

const todoApp = mongoose.model("tasks", todoSchema);

// const dataConnect = new MongoClient("mongodb://localhost:27017");
// const data = dataConnect.db("todoapp");
// const collection = data.collection("tasks");

const app = express();

app.use(express.json());

app.get("/list", async (req, res) => {
  const data = await todoApp.find({});
  res.send(data);
});

app.post("/add", async (req, res) => {
  const data = await new todoApp(req.body).save();
  res.sendStatus(data ? 201 : 500);
});

app.put("/edit/:_id", async (req, res) => {
  // const data = await todoApp.updateOne({ _id: new ObjectId(req.params.id) },{$set: {status:"Completed"}});
  // const data = await todoApp.updateOne(req.params,{$set: {status:"Completed"}});
  const data = await todoApp.updateOne(req.params, { $set: req.body });
  res.send(data.modifiedCount > 0 ? "Updated Record" : "No Record Found");
});

app.delete("/delete/:_id", async (req, res) => {
  //const data = await todoApp.deleteOne({ _id: new ObjectId(req.params.id) });
  const data = await todoApp.deleteOne(req.params);
  res.send(data.deletedCount > 0 ? "Deletion Success" : "No Record Found");
});

app.get("/search/:task", async (req, res) => {        //search API single & multiple field
  const data = await todoApp.find({
    "$or": [
      { "task" : {$regex:req.params.task}},
      { "status" : {$regex:req.params.task}}
  ]
  });
  res.send(data);
});

// app.get("/", async (req, res) => {
//   const data = await collection.find().toArray();
//   res.send(data);
// });

// app.post("/", async (req, res) => {
//   const data = await collection.insertOne(req.body);
//   res.send(data);
// });

// app.put("/:id", async (req, res) => {
//   const data = await collection.updateOne(
//     { _id: new ObjectId(req.params.id) },
//     { $set: { task: "Integrate Mongoose" } }
//   );
//   res.send(data.modifiedCount >0 ? "Record Modified":"No such Record Exists");
// });

// app.delete("/:id", async (req, res) => {
//   const data = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
//   res.send(data.deletedCount > 0 ? "Deleted Successfully" : "No record Found");
// });

app.listen(4200);
