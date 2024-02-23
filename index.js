const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todoapp")
const task = require("./schema.js");

const app = express();
app.use(express.json());

app.get("/",async(req,res)=>{
  const data = await task.find();
  res.send(data);
})

app.post("/add",async (req,res)=>{
  const data = new task(req.body)
  const result = await data.save();
  res.send(result);
})          
//{         Body from Postman
 // "task": "Your Task",
 // "status": "Your Status",
 // "date": "2024-02-24"
//}

app.put("/update/:status",async(req,res)=>{
  const data = await task.updateMany(req.params,{$set:req.body})
  res.send(data);
})

app.delete("/delete/:_id",async(req,res)=>{
  const data = await task.deleteMany(req.params); 
  res.send(data);
})


app.listen(5000);