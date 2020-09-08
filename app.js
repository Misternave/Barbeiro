const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/routes');
let ejs = require('ejs');
const { db } = require('./models/reserva');
const port = 5000;
const app = express();
dotenv.config();

//Mongoose Connection
const dbURI =
  'mongodb+srv://barbeiroNoobs:Barbeiro2020!@barbeirosnoobs.nuofn.mongodb.net/BarbeirosDB?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Check conection
db.once('open', function () {
  console.log('connected to mongoDB');
});

//Check DB errors

db.on('error', function (err) {
  console.log(err);
});

//MIDLEWARE
// parse application/x-www-forms-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//parse application/json
app.use(express.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
//Logs on the server
app.use(morgan('dev'));

// register view engine
app.set('view engine', 'ejs');

//ROUTES
app.use(routes);

//NOT FOUND
app.use(function (req, res) {
  res.status(404).render('404');
});

//LISTEN
app.listen(port, function () {
  console.log(`Express is running on port ${port}`);
});
