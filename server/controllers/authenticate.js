const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

function authenticateJWT(req, res, next) 
{
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) 
    {
        return res.status(401).json({ message: 'Authentication failed: No token provided.' });
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => 
    {
        if (err) 
        {
        return res.status(403).json({ message: 'Authentication failed: Invalid token.' });
        }

        req.user = decoded;Z
        next();
    });
}

module.exports = {
  authenticateJWT,
};
