const express = require('express');
const app = express();

//Import Routes
const authRoute = require('./routes/auth.js');

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(5000, ()=> console.log('Listening on port 5000...'));