const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongodb = require('mongodb');
const cors = require('cors');
const dbConfig = require('./app/config/db.config');
const db = require('./app/models');
const router = require('./app/routes/auth.routes');
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});
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

app.use('/api', router);

app.listen(4000, () => {
  console.log('Port running at 4000');
});
