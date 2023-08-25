require('dotenv').config();
const connectDb = require('./configDb/db');
const { login, signup, authenticateJWT, editUserInfo, changePassword } = require('./controllers/userController');
const { seedDestinationsDatabase, getAllDestinations, getDestinationById, clearDestinationsDatabase } = require('./controllers/destinationsController');
const {addAddress, fetchAddress, clearAddressDatabase} = require('./controllers/addressController');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDb();

// -------address controllers-------
// clearAddressDatabase();
app.post('/api/addAddress', addAddress);
app.get('/api/fetchAddress', fetchAddress);


// ------destinations controllers------
// seedDestinationsDatabase();
// clearDestinationsDatabase();
app.get('/api/getAllDestinations', getAllDestinations);
app.get('/api/getDestinations/byId', getDestinationById);


// ------user controllers------
app.post('/api/users/login', login);
app.post('/api/users/signup', signup);
app.get('/api/user', authenticateJWT, (req, res) => 
{
    res.json({ message: 'Protected route accessed successfully!', user: req.user });
});
app.post('/api/editUserInfo', editUserInfo);
app.post('/api/changePassword', changePassword);




app.listen(port, () => 
{
    console.log(`server is listening on port ${port}`);
});

