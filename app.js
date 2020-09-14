const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/routes');
const ejs = require('ejs');
const { db } = require('./models/reserva');
const port = 5000;
const app = express();
// dotenv.config(); //Load .env file (not ready yet)

// Helment setup (Default)
app.use(helmet());

//Rate limit setup
const limiter = new rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0,
});

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

//Flash
app.use(cookieParser());
app.use(
  session({
    secret: 'secret123',
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

//ROUTES
app.use(routes);

//NOT FOUND webpage (show default 404)
app.all('*', function (req, res) {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Não foi possivel encontrar pagina ${req.originalUrl}`,
  // });
  res.status(404).render('404');
});

//LISTEN
app.listen(port, function () {
  console.log(`Express is running on port ${port}`);
});
