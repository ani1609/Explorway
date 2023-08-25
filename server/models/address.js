const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    postalCode: {
        type: Number,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: Number,
        required: true,
        trim: true
    }
});


const Address = mongoose.model('Address', addressSchema);

module.exports = Address;