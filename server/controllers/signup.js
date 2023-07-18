const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { SECRET_KEY, SALT } = process.env;

const signup = async (req, res) => 
{
    const { name, email, password } = req.body;
    console.log("Backend received a signup request.");
    console.log("Backend name data: ", name);
    console.log("Backend email data: ", email);
    console.log("Backend password data: ", password);
     
    try
    {
        const user= await User.findOne({email:req.body.email});
        if(user)
        {
            console.log("User already exists");
            return res.status(409).send({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(Number(SALT));
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        await new User({...req.body,password:hashedPassword}).save();
        res.status(201).send({message:'User created successfully'});
        // const token=jwt.sign({id:savedUser._id},SECRET_KEY);
    }
    catch(error)
    {
        return res.status(500).send({message:"Internal Server Error"});
    }
};

module.exports =  signup ;