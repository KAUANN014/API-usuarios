const express = require('express');
const User = require('./models/user.models');

const app = express();
app.use(express.json()); 


module.exports = app;