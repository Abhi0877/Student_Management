require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose")
const multer = require('multer')
const studentRoute=require("./routes/studentRoute.js")
const assignRoute=require("./routes/assignmentRoute.js")
const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(multer().any())



app.use("/student",studentRoute)
app.use("/teacher",assignRoute)

mongoose.connect(process.env.DATA_BASE,
{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) );


app.listen(process.env.PORT , function () {
    console.log('Express app running on port ' + (process.env.PORT))
});