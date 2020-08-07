const express = require("express");
const barbeiro = require("../controllers/barbaCon");

const routes = express.Router();

//GET
routes.get("/", barbeiro.index);

routes.post("/", barbeiro.addBarbeiro);

//barbeiro (ID)

module.exports = routes;
