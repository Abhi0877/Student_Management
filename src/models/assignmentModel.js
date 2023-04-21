const mongoose = require('mongoose');



const assignmentSchema = new mongoose.Schema( {
        assignments: {
            type:[String]
            },
        student_keys: {
            type:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: "students",
                index: true,
            }], 
        }
    }, { timestamps: true });
      
   
     


module.exports = mongoose.model('assignment', assignmentSchema) 