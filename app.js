const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/routes');
let ejs = require('ejs');
const app = express();
dotenv.config();

//Mongoose Connection
const dbURI =
    'mongodb+srv://barbeiroNoobs:Barbeiro2020!@barbeirosnoobs.nuofn.mongodb.net/BarbeirosDB?retryWrites=true&w=majority';

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((result) => app.listen(3000))
    .then(console.log('listening from port 3000'))
    .catch((err) => console.log(err));

//MIDLEWARE

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

// register view engine
app.set('view engine', 'ejs');

//ROUTES
app.use(routes);

//LISTEN
// app.listen(3000, () => {
//   console.log(`Server ON Port-3000`);
// });

//NOT FOUND
app.use(function (req, res) {
    res.status(404).render('404');
});
