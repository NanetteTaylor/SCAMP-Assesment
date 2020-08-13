const router = require('express').Router();
const verifyAuth = require('../config/verifyAuth');

router.get('/', verifyAuth, (req, res) => {
    res.json({
        inventory: {
            name: 'First Item',
            description: 'Some random store item to access',
            user: req.user
        }
    });
});

module.exports = router;