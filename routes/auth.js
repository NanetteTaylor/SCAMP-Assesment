require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../model/helper');
const {registerValidation, loginValidation} = require('../config/inputValidation');

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
                    db(`INSERT INTO users(username, email, password, role) VALUES('${req.body.username}', '${req.body.email}', '${hashedPassword}', '${req.body.role || 'basic'}');`)
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
    //Validate login data
    const {error} = loginValidation(req.body);
    console.log(error);
    if(error) return res.status(400).send(`ERROR: ${error.details[0].message}`);

    // Check if user with email exists
    db(`SELECT * FROM users WHERE email='${req.body.email}';`)
        .then(async results => {
            console.log(results);
            if(results.data.length < 1) return res.status(400).send(`No user with email '${req.body.email}'`);
            let user = results.data[0];
            try{
                // Check if password is correct
                if(await bcrypt.compare(req.body.password, user.password)){
                    // Create and assign a token
                    const token = jwt.sign({uid: user.uid, role: user.role}, process.env.ACCESS_TOKEN_SECRET);
                    res.header('auth-token', token).send(`${user.username} has been logged in. Token: ${token}`);
                } else{
                    res.status(400).send('Password incorrect');
                }
            } catch (err){
                console.log(err)
            }
        })
});

module.exports = router;