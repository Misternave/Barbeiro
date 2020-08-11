const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
let ejs = require("ejs");
const morgan = require("morgan");
const mongoose = require('mongoose');
const app = express();

//Mongoose Connection
const dbURI = "mongodb+srv://barbeiroNoobs:Barbeiro2020!@barbeirosnoobs.nuofn.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .then(console.log("listening from port 3000"))
  .catch(err => console.log(err));


//MIDLEWARE

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

// register view engine
app.set("view engine", "ejs");

//ROUTES
app.use(routes);

//LISTEN
// app.listen(3000, () => {
//   console.log(`Server ON Port-3000`);
// });

//NOT FOUND
app.use(function (req, res) {
  res.status(404).render("404");
});
