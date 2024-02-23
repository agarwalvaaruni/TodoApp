const express = require("express");
const EventEmitter = require("events");

const event = new EventEmitter;
const app = express();

let count =0;
event.on("apiCall",()=>{
count ++;
console.log("API call : "+count);
})

app.get("/",(req,res)=>{
  console.log("api called");
  event.emit("apiCall");
})

app.get("/update",(req,res)=>{
  console.log("update api called");
  event.emit("apiCall");
})

app.get("/search",(req,res)=>{
  console.log("search api called");
  event.emit("apiCall");
})

app.listen(5000);