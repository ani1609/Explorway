const Address = require('../models/address');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const addAddress = async (req, res) => 
{
    try 
    {
        const { name, street, city, state, postalCode, country, contact } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const user=await User.findById(decoded.id);
        const email=user.email;
        const address = new Address({ email, name, street, city, state, postalCode, country, contact });
        await address.save();
        res.status(201).json({ address });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const fetchAddress = async (req, res) =>
{
    const email=req.query.email;
    try
    {
        const address = await Address.find({email:email});
        res.status(200).json({ address });
    }
    catch (error)
    {
        console.error("Error fetching data:", error);
    }
}

const clearAddressDatabase = async () => 
{
    try
    {
        await Address.deleteMany({});
        console.log('Address database cleared successfully.');
    }
    catch (err)
    {
        console.error('Error clearing the database:', err);
    }
};


module.exports = { 
    addAddress, 
    fetchAddress,
    clearAddressDatabase
};



