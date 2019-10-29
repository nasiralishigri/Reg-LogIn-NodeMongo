const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {

    /// First Validate the HTTP request
    var {error} = Validate(req.body);
    
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    /// Now find usere by email
     
    let user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send("Incorrect Email or Password");
    }
 /// Then Validate Credentials in MongoDB match
 /// those provided in the request

 const validPassword =  await bcrypt.compare(req.body.password, user.password);
 if(!validPassword){
     return res.status(400).send("Incorrect Email or Password");
 }

    // const token = jwt.sign({_id:user._id}, 'PrivateKey');
    const token = jwt.sign({ _id: user._id },'PrivateKey');
    res.send(token);
});

function Validate(req){
    const schema = {
        email: Joi.string().min(5).max(150).required().email(),
        password: Joi.string().min(3).max(100).required()
    };

    return Joi.validate(req,schema);

}


module.exports = router;