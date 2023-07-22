const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { SECRET_KEY, SALT } = process.env;

const signup = async (req, res) => 
{
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User already exists");
      return res.status(409).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(Number(SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({ ...req.body, password: hashedPassword }).save();

    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });
    console.log("new user", newUser);
    res.status(201).send({user:newUser});

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = signup;
