const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
// Connectiong to the DB using mongoose, The connection returns a promise
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database connection successful');
  });
const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
