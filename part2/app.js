const express = require('express');
const path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var session = require('express-session');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');



app.use(session({
    secret: 'b706835de79a2b4e80506f582af3676ac8361638'|| process.env.,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;