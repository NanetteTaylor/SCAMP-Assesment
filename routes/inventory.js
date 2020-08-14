const router = require('express').Router();
const {ROLES, verifyAuth, verifyAccess} = require('../config/verifyAuth');
const {itemValidation} = require('../config/inputValidation');
const db = require('../model/helper');

// Return all items in the inventory
router.get('/', verifyAuth, verifyAccess(ROLES.BASIC), (req, res) => {
    db('SELECT * FROM items')
        .then(result => {
            res.status(200).json(result.data);
        })
        .catch(err => res.status(500).send(err));
});

// TODO: Finish Order Route
router.put('/order/:itemID/:quantity', verifyAuth, verifyAccess(ROLES.BASIC), (req, res) => {
    // res.send('You can order');
    db(`SELECT * FROM items WHERE item_id=${req.params.itemID}`)
        .then(result => {
            if(result.data.length < 1) return res.send('No item with that ID');
            const item = result.data[0];
            if(req.params.quantity > item.quantity) return res.send('Order quantity is too much');
            res.send(`You're ordering ${item.name} - ${req.params.quantity}`);
        })
        .catch(err => res.status(500).send(err))
});

// Add item to inventory
router.post('/add', verifyAuth, verifyAccess(ROLES.ADMIN), (req, res) => {
    //Validate data
    const {error} = itemValidation(req.body);
    console.log(error);
    if(error) return res.status(400).send(`ERROR: ${error.details[0].message}`);

    db(`INSERT INTO items(name, description, price, quantity) VALUES('${req.body.name}', '${req.body.description}', ${req.body.price}, ${req.body.quantity})`)
        .then(result=> {
            res.status(201).send(`${req.body.name} has been added to the inventory`);
        })
        .catch(err => res.status(500).send(err));
});

// Update item quantity
router.put('/update-quantity/:itemID/:newQuantity', verifyAuth, verifyAccess(ROLES.ADMIN), (req, res) => {
    db(`UPDATE items SET quantity=${req.params.newQuantity} WHERE item_id=${req.params.itemID}`)
        .then(result=> {
            res.status(200).send(`Item has been updated`);
        })
        .catch(err => res.status(500).send(err));
});

// Update item
router.put('/update-item/:itemID', verifyAuth, verifyAccess(ROLES.ADMIN), (req, res) => {
    //Validate data
    const {error} = itemValidation(req.body);
    console.log(error);
    if(error) return res.status(400).send(`ERROR: ${error.details[0].message}`);

    db(`UPDATE items SET name='${req.body.name}', description='${req.body.description}', price=${req.body.price}, quantity=${req.body.quantity} WHERE item_id=${req.params.itemID}`)
        .then(result=> {
            res.status(200).send(`Item has been updated`);
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router;