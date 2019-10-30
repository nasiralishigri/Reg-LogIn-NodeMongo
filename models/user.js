

const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 150
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    confirmpassword: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    checkbox: {
        type: Boolean,
        default: 0
    }
}));
 
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        username: Joi.string().min(3).max(150).required(),
        password: Joi.string().min(5).max(255).required(),
        confirmpassword: Joi.string().min(5).max(255).required(),
        checkbox: Joi.required()
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateUser;