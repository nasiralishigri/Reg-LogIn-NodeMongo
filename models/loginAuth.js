

const Joi = require('joi');
const mongoose = require('mongoose');
 
const AuthUser = mongoose.model('AuthUser', new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
   
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));
 
function validateUser(user) {
    const schema = {
     
        email: Joi.string().min(5).max(255).required().email(),
      
        password: Joi.string().min(5).max(255).required(),
    
    };
    return Joi.validate(user, schema);
}
 
exports.AuthUser = AuthUser;
exports.validate = validateUser;