const mongoose = require('mongoose');
const Joi=require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
    },
    dob: {
        type: Date, 
    },
    gender: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    preferredLocationType: {
        type: String,
    },
    preferredLanguage: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
}

module.exports = { User, validateUser };