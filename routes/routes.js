const express = require('express');
const reserva = require('../controllers/reservaCon');
const barbeiro = require('../controllers/barbaCon');

// const hora = require('../controllers/horaCon');


const routes = express.Router();
//RESERVA//
routes.get('/reserva', reserva.index);
routes.post('/reserva', reserva.addReserva);

//HORA//
// routes.get('/hora', hora.index);
// routes.post('/hora', hora.addHora);

//barbeiro (ID) //
routes.get('/:id', barbeiro.showBarbeiro);
routes.put('/:id', barbeiro.editBarbeiro);
routes.delete('/:id', barbeiro.deleteBarbeiro);

//BARBEIRO//
routes.get('/', barbeiro.index);
routes.post('/', barbeiro.addBarbeiro);

module.exports = routes;
