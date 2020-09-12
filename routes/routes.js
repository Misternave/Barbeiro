const express = require('express');
const routes = express.Router();
const reserva = require('../controllers/reservaCon');
const barbeiro = require('../controllers/barbaCon');
const utilizador = require('../controllers/utilizadorCon');
const projectController = require('../controllers/projectController');
// const hora = require('../controllers/horaCon');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth');

//Projectos//
routes.get('/projects', authMiddleware, projectController.getProject);
routes.post('/projects', authMiddleware, projectController.postProject);

//UTILIZADOR//
routes.get('/register', utilizador.showRegister);
routes.post('/register', utilizador.register);
routes.get('/authenticate', utilizador.showAuthenticate);
routes.post('/authenticate', utilizador.authenticate);
routes.get('/forgotpassword', utilizador.showForgotPassword);
routes.post('/forgotpassword', utilizador.forgotPassword);
routes.get('/resetpassword', utilizador.showResetRassword);
routes.post('/resetpassword', utilizador.resetPassword);

//RESERVA//
routes.get('/', reserva.index);
routes.post(
  '/',
  [
    // email must be an email
    body('email_cliente').isEmail().normalizeEmail(),
    // phonenumber must be at least 9 chars long
    body('contato_cliente').isLength({ min: 9, max: 9 }),
    // name must be not empty
    body('nome_cliente').not().isEmpty().trim().escape(),
    // comments must be not empty
    body('comentario_cliente').optional().trim().escape(),
  ],
  reserva.addReserva
);
routes.get('/availabletime', reserva.getReserva);
routes.get('/defaulttime', reserva.getHorasDisponiveis);

//HORA//
// routes.get('/hora', hora.index);
// routes.post('/hora', hora.addHora);

// //barbeiro (ID) //
// routes.get('/:id', barbeiro.showBarbeiro);
// routes.put('/:id', barbeiro.editBarbeiro);
// routes.delete('/:id', barbeiro.deleteBarbeiro);

// //BARBEIRO//
// routes.get('/barbeiro', barbeiro.index);
// routes.post('/barbeiro', barbeiro.addBarbeiro);

module.exports = routes;
