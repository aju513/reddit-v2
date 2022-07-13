const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongodb = require('mongodb');
const cors = require('cors');
const dbConfig = require('./app/config/db.config');
const db = require('./app/models');
const router = require('./app/routes/auth.routes');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connection

mongoose
  .connect(`mongodb://0.0.0.0:27017`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected.');
  })
  .catch((err) => {
    console.log('connection error', err);
  });

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
    { 'Access-Control-Allow-Credentials': true }
  );
  next();
});
app.use('/api', router);

app.listen(4000, () => {
  console.log('Port running at 4000');
});
