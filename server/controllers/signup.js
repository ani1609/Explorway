const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { SECRET_KEY, SALT } = process.env;

const signup = async (req, res) => 
{
  try 
  {
    const user = await User.findOne({ email: req.body.email });
    if (user) 
    {
      return res.status(409).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(Number(SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({ ...req.body, password: hashedPassword }).save();

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '5d' });
    res.status(201).send({user:newUser, token: token});

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = signup;
