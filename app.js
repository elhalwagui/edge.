const express = require('express');
const compression = require('compression');
const app = express();

const itemRouter = require('./routes/itemRoutes');

module.exports = app;

app.use(compression());
// Configuring the url
app.use('/api/v1/items', itemRouter);
