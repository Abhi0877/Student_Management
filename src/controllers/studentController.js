const bcrypt = require('bcrypt')
const uploadFile=require('../utlis/aws')
const jwt = require('jsonwebtoken')
const studentValidSchema = require("../validation/valid")
const studentModel = require("../models/studentModel")

const createStudent = async (req, res) => {
    try {
        const { error, value } = studentValidSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).send({ "Invalid Request": error.details[0].message });
        }

        const { first_name, last_name, email, phone, school_name, password } = req.body
        let files= req.files
        

        const emailExist = await studentModel.findOne({ email: email });
        if (emailExist) {
            return res.status(409).send({ "message": " email is alrady exist" });
        }

        const phoneExist = await studentModel.findOne({ phone: phone });
        if (phoneExist) {
            return res.status(409).send({ "message": " phone number is alrady exist" });

        }

        const encryptedPassword = await bcrypt.hash(password, 10)
         let Picture=null
        if(files && files.length>0){
        Picture = await uploadFile.uploadFile(files[0],"studentImg")
        }

        const studentData = await studentModel.create({
            first_name,
            last_name,
            email,
            phone,
            school_name,
            password: encryptedPassword,
            photo:Picture
        })


        return res.status(201).send(studentData)
    } catch (error) {
        return res.status(500).send({ "error": error.message })
    }

}

const loginStudent = async (req, res) => {
    try {
        const { email, phone, password } = req.body
        
        if (email && password) {

        let userName = await studentModel.findOne({ email:email });

        if (!userName) {
            return res.status(400).send({ status: false, msg: "Invalid user email" })
        }

        const decryptPassword = await bcrypt.compare(password, userName.password)

        if (!decryptPassword) {
            return res.status(400).send({ status: false, msg: 'password is incorrect' })
            
        }
        let payload = { _id: userName._id,email:userName.email,phone:userName.phone } 
         
        let generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '60m' })

        return res.status(200).send({"message":"login successfully ", "token":generatedToken})

        }else if(phone && password){

            let userName = await studentModel.findOne({ phone:phone });

        if (!userName) {
            return res.status(400).send({ status: false, msg: "Invalid user email" })
        }

        const decryptPassword = await bcrypt.compare(password, userName.password)

        if (!decryptPassword) {
            return res.status(400).send({ status: false, msg: 'password is incorrect' })
            
        }
        let payload = { _id: userName._id,email:userName.email,phone:userName.phone }  
        let generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '60m' })

        return res.status(200).send({"message":"login successfully ", "token":generatedToken})
            
        }else{
            return res.status(400).send({ status: false, msg: "must contain email and password"}) 
        }

    } catch (error) {
        return res.status(500).send({ "error": error.message })
    }

}
module.exports = { createStudent, loginStudent }
