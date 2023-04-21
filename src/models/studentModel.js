const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema( {
        first_name: {
            type:String,
             required:"name is required",
             trim:true
            },
        last_name: {
            type:String, 
            required:"name is required",
            trim:true
        },
        school_name: {
            type:String, 
            required:"name is required",
            trim:true
        },
        phone: {
            type:String,
             required:"phone is required",
             trim:true ,
              unique:true
            },    

        email: {
            type:String,
             required:"Email is required",
             trim:true,
             lowercase:true,
              unique:true
            }, 
        password: {
            type:String,
             required:"password is required",
            },
        photo: {
          type:String
        },
    }, { timestamps: true });
      
   
     


module.exports = mongoose.model('student', studentSchema) 