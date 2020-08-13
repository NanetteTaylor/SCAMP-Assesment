const express = require('express');
const app = express();
//Import Routes
const authRoute = require('./routes/auth.js');

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(5000, ()=> console.log('Listening on port 5000...'));