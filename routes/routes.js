const express = require('express');
const routes = express.Router();
const reserva = require('../controllers/reservaCon');
const barbeiro = require('../controllers/barbaCon');
const utilizador = require('../controllers/utilizadorCon');
const projectController = require('../controllers/projectController');
// const hora = require('../controllers/horaCon');
const { body, validationResult } = require('express-validator');
const { requireAuth, checkUser } = require('../middlewares/auth');

//All//
routes.get('*', checkUser);
//Projectos//
routes.get('/projects', requireAuth, projectController.getProject);
routes.post('/projects', requireAuth, projectController.postProject);

//UTILIZADOR//
routes.get('/register', utilizador.showRegister);
routes.post('/register', utilizador.register);
routes.get('/authenticate', utilizador.showAuthenticate);
routes.post('/authenticate', utilizador.authenticate);
routes.get('/logout', utilizador.showLogOut);
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
    body('email_cliente').isEmail().normalizeEmail().withMessage('Email invalido'),
    // phonenumber must be at least 9 chars long
    body('contato_cliente')
      .isLength({ min: 9, max: 9 })
      .withMessage('Contato:Numero tem de ter 9 digitos')
      .isInt()
      .withMessage('Contato:Tem de ser numero'),
    // name must be not empty
    body('nome_cliente')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Nome tem de ser preenchido')
      .isLength({ min: 3 })
      .withMessage('Nome: Tem de ter 3 caracteres no minimo.')
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('Nome: Tem de ser alfabetico'),
    // comments must be not empty
    body('comentario_cliente').optional().trim().escape(),
  ],
  reserva.addReserva
);
routes.get('/availabletime', reserva.getReserva);
routes.get('/defaulttime', reserva.getHorasDisponiveis);

//BARBEIRO//
routes.get('/barbeiro', barbeiro.index);

module.exports = routes;
