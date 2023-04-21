const Joi=require("joi")


const studentValidSchema = Joi.object({
    first_name: Joi.string().min(3).max(40).required(),
    last_name: Joi.string().min(3).max(400).required(),
    school_name: Joi.string().min(3).max(90).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    password: Joi.string().min(8).max(15).pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
    photo:Joi.optional()
  });


module.exports=studentValidSchema