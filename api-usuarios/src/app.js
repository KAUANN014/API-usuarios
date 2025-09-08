const express = require('express');
const User = require('./models/user.models');
const userRoutes = require('./routes/userRouter')

const app = express();
app.use(express.json());

app.use('/users', userRoutes)

module.exports = app;