const express = require('express');
const reserva = require('../controllers/reservaCon');
const barbeiro = require('../controllers/barbaCon');
const utilizador = require('../controllers/utilizadorCon');
const projectController = require('../controllers/projectController');
// const hora = require('../controllers/horaCon');

const routes = express.Router();
//RESERVA//
routes.get('/', reserva.index);
routes.post('/', reserva.addReserva);
routes.get('/availabletime', reserva.getReserva);
routes.get('/defaulttime', reserva.getHorasDisponiveis);

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

//UTILIZADOR//
routes.post('/register', utilizador.register);
routes.post('/authenticate', utilizador.authenticate);

//Projectos//
routes.get('/projects', projectController.index);

module.exports = routes;
