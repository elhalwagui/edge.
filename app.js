const express = require('express');
const app = express();

const itemRouter = require('./routes/itemRoutes');

module.exports = app;
// Configuring the url
app.use('/api/v1/items', itemRouter);
