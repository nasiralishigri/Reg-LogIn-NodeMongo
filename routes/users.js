const jwt = require('jsonwebtoken');
const _ = require("underscore");
const config = require('config');
var bcrypt = require('bcrypt');
var lodash = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
 
router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());

router.post('/', async (req, res) => {
    // First Validate The Request
    console.log(req.body.name);
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        // user = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // });


       // // Instead of whole json file above we use lodash to simply get the data from body through schema
    //    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    user = new User(_.pick(req.body, ['name', 'email','username', 'password','confirmpassword' ]));

       const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        const token = jwt.sign({_id:user._id} , 'PrivateKey');
        res.header('x-auth-token',token).send(_.pick(user,["id","name",'username' ,"email",]));
    }
});
 
module.exports = router;