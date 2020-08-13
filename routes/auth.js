const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../model/helper');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', (req, res) => {
    //Validate data before creating a user
    const {error} = registerValidation(req.body);
    console.log(error);
    if(error) return res.status(400).send(`ERROR: ${error.details[0].message}`);
    // res.send(value);

    db(`SELECT * FROM users WHERE email = '${req.body.email}';`)
        .then(async result => {
            // if user exist, send an error message
            if(result.data.length > 0){
                // res.status(400).send('A user with this email already exists');
                throw new Error("A user with this email already exists");
            } // if user doesn't exist....
            else{
                try {
                    // hash the password
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    // insert into user database
                    db(`INSERT INTO users(username, email, password) VALUES('${req.body.username}', '${req.body.email}', '${hashedPasswordgt}');`)
                        .then(result => {
                            res.status(201).send(`Created ${req.body.username} as a new user`);
                        })
                        .catch(err => res.status(500).send(err.message))
                }catch (err) {
                    res.status(500).send(err.message);
                }
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

router.post('/login', (req, res) => {

});

module.exports = router;