const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function auth(req, res, next){
    const token = req.header('x-auth-token');

    if(!token) res.status(401).send('Access denied. No token provided.');

    try{
        const decoed = jwt.verify(token, config.get('jwtPrivateKey'));
        res.user = decoded;
        next(); 
    }catch(exp){
        res.status(400).send("Invalid token.");
    }
}