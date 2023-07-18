const mongoose = require('mongoose');
const Joi=require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
    ,
    email: {
        type: String,
        required: true,
        unique: true,
    }
    ,
    password: {
        type: String,
        required: true,
    }
    ,
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dv7hswrot/image/upload/v1601507591/user_xg4x7l.png",
    }
    ,
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