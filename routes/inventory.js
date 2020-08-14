const router = require('express').Router();
const verifyAuth = require('../config/verifyAuth');

router.get('/', verifyAuth, (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'basic') res.status(401).send('Forbidden');
    res.json({
        inventory: {
            name: 'First Item',
            description: 'Some random store item to access',
            user: req.user
        }
    });
});

router.post('/add', verifyAuth, (req, res) => {
    if(req.user.role !== 'admin') res.send('Forbidden');
    res.send('You can add to inventory');
});

router.put('/update-quantity/:itemID/:newQuantity', verifyAuth, (req, res) => {
    if(req.user.role !== 'admin') res.send('Forbidden');
    res.send('You can update inventory');
});

router.patch('/order/:itemID/:quantity', verifyAuth, (req, res) => {
    if(req.user.role !== 'admin' && req.user.role !== 'basic') res.send('Forbidden');
    res.send('You can order');
});

module.exports = router;