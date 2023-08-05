const Destinations = require('../models/destinations');

const getAllDestinations = async (req, res) =>
{
    try
    {
        const destinations = await Destinations.find();
        res.status(200).json(destinations);
    } catch (error)
    {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {getAllDestinations};