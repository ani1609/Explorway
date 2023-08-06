require('dotenv').config();
const connectDb = require('./configDb/db');
const signupCotroller = require('./controllers/signup');
const loginCotroller = require('./controllers/login');
const { authenticateJWT } = require('./controllers/authenticate');
const { seedDatabase, clearDatabase } = require('./controllers/databaseSeeding');
const {getAllDestinations, getDestinationsById} = require('./controllers/getDestinations');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDb();

// clearDatabase();
seedDatabase();

app.get('/api/getDestinations', getAllDestinations);
app.get('/api/getDestinations/byId', getDestinationsById);

app.post('/api/users/signup', signupCotroller);
app.post('/api/users/login', loginCotroller);

app.get('/api/user', authenticateJWT, (req, res) => 
{
    res.json({ message: 'Protected route accessed successfully!', user: req.user });
});




app.listen(port, () => 
{
    console.log(`server is listening on port ${port}`);
});

