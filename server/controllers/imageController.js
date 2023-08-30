const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

const uploadProfilePic = async (req, res) =>
{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    user.profilePic = req.file.path;
    await user.save();
    res.status(201).json({ user });
};

const deleteProfilePic = async (req, res) =>
{
    const token = req.body.headers.Authorization.split(' ')[1];
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    const user= await User.findById(decoded.id);
    const filePath=user.profilePic;
    console.log(filePath);
    fs.unlink(filePath, (error) => {
        if (error) {
            console.error('Error deleting file:', error);
        } else {
            console.log('File deleted successfully.');
        }
    });
    user.profilePic="";
    await user.save();
    res.status(201).json({ user });
}

const addNewProfilePic = async (req, res) =>
{
    console.log("got add new request");
}


module.exports = { 
    uploadProfilePic,
    deleteProfilePic,
    addNewProfilePic
};
