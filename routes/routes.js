const express = require('express');
const reserva = require('../controllers/reservaCon');
const barbeiro = require('../controllers/barbaCon');
const utilizador = require('../controllers/utilizadorCon');
// const hora = require('../controllers/horaCon');

const routes = express.Router();
//RESERVA//
routes.get('/', reserva.index);
routes.post('/', reserva.addReserva);
routes.get('/availabletime', reserva.getReserva);

//HORA//
// routes.get('/hora', hora.index);
// routes.post('/hora', hora.addHora);

//barbeiro (ID) //
routes.get('/:id', barbeiro.showBarbeiro);
routes.put('/:id', barbeiro.editBarbeiro);
routes.delete('/:id', barbeiro.deleteBarbeiro);

//BARBEIRO//
routes.get('/barbeiro', barbeiro.index);
routes.post('/barbeiro', barbeiro.addBarbeiro);

//UTILIZAODR//
routes.post('/register', utilizador.index);
module.exports = routes;
