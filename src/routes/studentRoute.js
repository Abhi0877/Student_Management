const express=require("express")
const studentRoute=express.Router();
const studentController=require("../controllers/studentController")


studentRoute.get("/test",(req,res)=>{
    console.log("working api");
})

studentRoute.post('/registration',studentController.createStudent)
studentRoute.post('/login',studentController.loginStudent)




module.exports=studentRoute