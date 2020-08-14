const jwt = require('jsonwebtoken');

module.exports = function auth (req, res, next){
    const token = req.header('auth-token');
    if(!token) res.status(401).send('You need to login');

    try{
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }

}