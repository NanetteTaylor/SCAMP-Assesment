const jwt = require('jsonwebtoken');
const ROLES = {
    ADMIN: 'admin',
    BASIC: 'basic'
}

const verifyAuth =  async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) res.status(401).send('You need to login');

    try{
        req.user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }

}

const verifyAccess = (role) => {
    return (req, res, next) => {
        if (role === ROLES.ADMIN && req.user.role !== ROLES.ADMIN) res.send('Forbidden');
        else if(role === ROLES.BASIC && (req.user.role !== ROLES.BASIC && req.user.role !== ROLES.ADMIN)) res.send('Forbidden');
        else next();
    }
}


module.exports = {ROLES, verifyAuth, verifyAccess}