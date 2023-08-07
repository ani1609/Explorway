const {User}=require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;


const editUserInfo = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, dob, profilePic } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        
        const name=firstName+" "+lastName;
        const updatedUser = await User.findByIdAndUpdate(decoded.id, 
        {
            name,
            email,
            contact,
            dob,
            profilePic
        }, { new: true });

        if (updatedUser) 
        {
            res.json({
                user: updatedUser
            });
        }
        else 
        {
            res.status(404).json({ error: 'User not found' });
        }
    } 
    catch (error) 
    {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { editUserInfo };