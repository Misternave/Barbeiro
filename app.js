const express = require("express");
const path = require('path');
const routes = require("./routes/routes");
let ejs = require('ejs');
const morgan = require('morgan');



const app = express();

//MIDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan('dev'));



// register view engine
app.set('view engine', 'ejs');

//ROUTES
app.use(routes);



//LISTEN
app.listen(3000, ()=>{
    console.log("heeeey")
})






















//NOT FOUND
app.use(function (req, res) {
    res.status(404).render("404");
  });

