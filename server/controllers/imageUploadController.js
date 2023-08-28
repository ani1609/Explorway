const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const uploadProfilePic = async (req, res) =>
{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    user.profilePic = req.file.path;
    await user.save();
    res.status(201).json({ user });
};


module.exports = { uploadProfilePic };
