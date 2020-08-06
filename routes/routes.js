const express = require("express")
const barbeiro = require("../controllers/Barbacon")

const routes = express.Router();

//GET
routes.get("/", barbeiro.index)


routes.post("/", barbeiro.nBarbeiro)


//barbeiro (ID)



module.exports = routes
