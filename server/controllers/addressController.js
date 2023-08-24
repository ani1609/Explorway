const Address = require('../models/address');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const addAddress = async (req, res) => 
{
    try 
    {
        const { street, city, state, postalCode, country } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const user=await User.findById(decoded.id);
        const email=user.email;
        const address = new Address({ email, street, city, state, postalCode, country });
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


module.exports = { 
    addAddress, 
    fetchAddress 
};



