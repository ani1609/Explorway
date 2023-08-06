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

const getDestinationsById = async (req, res) =>
{
    const destination=await Destinations.findOne({id:req.query.id});
    res.status(200).json(destination);
}

module.exports = {getAllDestinations, getDestinationsById};