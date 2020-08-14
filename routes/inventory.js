const router = require('express').Router();
const {ROLES, verifyAuth, verifyAccess} = require('../config/verifyAuth');

router.get('/', verifyAuth, verifyAccess(ROLES.BASIC), (req, res) => {
    res.json({
        inventory: {
            name: 'First Item',
            description: 'Some random store item to access',
            user: req.user
        }
    });
});

router.put('/order/:itemID/:quantity', verifyAuth, verifyAccess(ROLES.BASIC), (req, res) => {
    res.send('You can order');
});

router.post('/add', verifyAuth, verifyAccess(ROLES.ADMIN), (req, res) => {
    res.send('You can add to inventory');
});

router.put('/update-quantity/:itemID/:newQuantity', verifyAuth, verifyAccess(ROLES.ADMIN), (req, res) => {
    res.send('You can update inventory');
});

module.exports = router;