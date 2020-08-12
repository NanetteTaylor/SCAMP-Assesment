const router = require('express').Router();
const db = require('../model/helper');
router.post('/register', (req, res) => {
    res.send('Register');
});

router.post('/login', (req, res) => {

});

module.exports = router;