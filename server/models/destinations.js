const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
{
    img: { type: String, required: true },
    place: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    id: { type: Number, required: true }
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;