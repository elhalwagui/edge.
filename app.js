const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(compression());

// 2) Routes
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/users', userRouter);

// error handling if the url is not defined
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // passing the error to next will call the global error handling middleware first
});

// global error handling middleware function
app.use(globalErrorHandler);

module.exports = app;
