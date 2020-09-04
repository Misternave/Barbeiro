const express = require('express');
const routes = express.Router();
const reserva = require('../controllers/reservaCon');
const barbeiro = require('../controllers/barbaCon');
const utilizador = require('../controllers/utilizadorCon');
const projectController = require('../controllers/projectController');
// const hora = require('../controllers/horaCon');
const authMiddleware = require('../middlewares/auth');

//Projectos//
routes.get('/projects', authMiddleware, projectController.getProject);
routes.post('/projects', authMiddleware, projectController.postProject);

//UTILIZADOR//
routes.get('/register', utilizador.showRegister);
routes.post('/register', utilizador.register);
routes.get('/authenticate', utilizador.showauthenticate);
routes.post('/authenticate', utilizador.authenticate);

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

module.exports = routes;
