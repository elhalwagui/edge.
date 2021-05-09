const express = require('express');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

const itemRouter = require('./routes/itemRoutes');

app.use(compression());
// Configuring the url
app.use('/api/v1/items', itemRouter);

// error handling if the url is not defined
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // passing the error to next will call the global error handling middleware first
});

// global error handling middleware function
app.use(globalErrorHandler);

module.exports = app;
