const express = require('express');
const userRoutes = require('./routes/userRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const authRoutes = require('./routes/authRouter')

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
