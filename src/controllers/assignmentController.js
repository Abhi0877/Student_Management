const assignmentModel=require('../models/assignmentModel')
const studentModel=require("../models/studentModel")
const uploadFile=require('../utlis/aws')


const createAssignment=async(req,res)=>{
    
    try{
       let {student_list}= req.body
        let student_keys=[];
       try{
        student_keys=JSON.parse(student_list)
       }catch(error){
        return res.status(500).send({ "error": error.message })
       }

       let files= req.files

       const studentList=await studentModel.find({_id : {$in:student_keys} })

       if(studentList.length!=student_keys.length){
        return res.status(400).send({ "message": "provide valid students Key" })
       }

       let assignments=[]
       
       if((!(files && files.length>0))){
        return res.status(400).send({ "message": "provide atlest one assigment" })
       }
       
        for(fileData of files){
           let img=await uploadFile.uploadFile(fileData,"assignement")
           assignments.push(img)
        }
       
       const assignementData=await assignmentModel.create({assignments,student_keys})
       return res.status(200).send({"addigment dasta":assignementData})
    
    }catch(error){
        return res.status(500).send({ "error": error.message })
    }

}


module.exports={createAssignment}