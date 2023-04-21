const express=require("express")
const assRoute=express.Router();
const assignmentController=require("../controllers/assignmentController")

assRoute.post('/assignment',assignmentController.createAssignment)

module.exports=assRoute