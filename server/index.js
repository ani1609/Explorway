require('dotenv').config();
const connectDb = require('./configDb/db');
const { login, signup, authenticateJWT, editUserInfo, changePassword } = require('./controllers/userController');
const { seedDestinationsDatabase, getAllDestinations, getDestinationById, clearDestinationsDatabase } = require('./controllers/destinationsController');
const {addAddress, fetchAddress, clearAddressDatabase} = require('./controllers/addressController');
const { uploadProfilePic, deleteProfilePic, addNewProfilePic } = require('./controllers/imageController');
const multer = require('multer');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

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



// ------upload profile pic------
const storage=multer.diskStorage(
{
    destination: function(req, file, cb)
    {
        cb(null, 'uploads/');
    }
    ,
    filename: function(req, file, cb)
    {
        cb(null, `${Date.now()}-${Math.round(Math.random()*1E9)}-${file.originalname}`);
    }
});
const upload=multer({storage: storage});
app.post('/api/uploadProfilePic', upload.single('profilePic'), uploadProfilePic);
app.post('/api/deleteProfilePic', deleteProfilePic);
app.post('/api/addNewProfilePic', upload.single('profilePic'), addNewProfilePic);





app.listen(port, () => 
{
    console.log(`server is listening on port ${port}`);
});

