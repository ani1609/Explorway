require('dotenv').config();
const connectDb = require('./configDb/db');
const signupCotroller = require('./controllers/signup');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;  

app.use(cors());
app.use(express.json());

connectDb();


// app.post('/api/users/login', (req, res) =>
// {
//     console.log("Backend received a login request.");
//     const { email, password } = req.body;
 
//     console.log("Backend email data: ", email);
//     console.log("Backend password data: ", password);

//     res.status(200).json({ success: true, message: "Login successful!" });
// });

app.post('/api/users/signup', signupCotroller);

app.listen(port, () => 
{
    console.log(`server is listening on port ${port}`);
});

