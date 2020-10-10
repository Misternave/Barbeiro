const Reserva = require('../models/reserva');
const dataDisp = require('../reservasDisponiveis.json');
//const datasEfect = require('../reservasEfetuadas.json');
const barbeiros = require('./barbacon');
const { localTime } = require('../utils/lib');
const fs = require('fs');
const { start } = require('repl');
const { body, validationResult } = require('express-validator');

//Handle Errors
const handleErrors = (err) => {
  console.log(err.errors);

  let errors = { nome: '', email: '', contato: '' };

  err.errors.forEach((element) => {
    //incorrect phone Number
    if (element.param === 'contato_cliente') {
      errors.contato = element.msg;
    }
    //incorrect Name
    if (element.param === 'nome_cliente') {
      errors.nome = element.msg;
    }
    //incorrect Email
    if (element.param === 'email_cliente') {
      errors.email = element.msg;
    }
  });

  return errors;
};

const index = async (req, res) => {
  const arrayBarbeiros = await barbeiros.getBarbeiros();

  res.render('reservas', {
    barbeiros: arrayBarbeiros,
    // success: req.flash('success'),
    // errors: req.flash('errors'),
  });
  // // res.render('reservas', { barbeiros: arrayBarbeiros });
};

const getHorasDisponiveis = (req, res) => {
  let startDate = req.query.date;
  let idBarbeiro = req.query.idbarbeiro;
  let arrayHorasDisponiveis = [];
  const now = new Date();

  const dummyDate = {
    datetime: {
      $gte: localTime(new Date(new Date(startDate).setHours(now.getHours(), now.getMinutes(), 00))),
      $lt: localTime(new Date(new Date(startDate).setHours(23, 59, 59))),
    },
    idBarbeiro: idBarbeiro,
  };
  console.log(dummyDate);
  //validação com as reservas existentes//
  //função que converte datetime UTC para horas (HH:MM)
  function convertUTCDateTimeToTime(valor) {
    if (typeof valor === 'object') valor = JSON.stringify(valor);
    return valor.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
  }
  //Comunicação com MongoDb
  Reserva.find(dummyDate)
    .then((reservas) => {
      if (
        typeof reservas != 'undefined' &&
        reservas != null &&
        reservas.length != null &&
        reservas.length > 0
      ) {
        //Carrega todas as horas disponiveis //
        for (x in dataDisp) {
          if (dataDisp[x].hour >= `1970-01-01T${now.getHours()}:${now.getMinutes()}:00.000Z`) {
            let hour = dataDisp[x].hour;

            hour = hour.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
            arrayHorasDisponiveis.push(hour);
          }
        }
        let reservas1 = reservas.map(function (reserva, index) {
          return convertUTCDateTimeToTime(reserva.datetime);
        });

        arrayHorasDisponiveis = arrayHorasDisponiveis.filter(function (val) {
          return reservas1.indexOf(val) == -1;
        });
        res.status(200).json(arrayHorasDisponiveis);
      } else {
        for (x in dataDisp) {
          let hour = dataDisp[x].hour;
          if (dataDisp[x].hour >= `1970-01-01T${now.getHours()}:${now.getMinutes()}:00.000Z`) {
            hour = hour.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
            arrayHorasDisponiveis.push(hour);
          }
        }
        res.status(200).json(arrayHorasDisponiveis);
      }
    })
    .catch(() => {
      res.send('Sorry! Algo correu mal.');
    });
};

const getReserva = (req, res) => {
  // VARIABLES //
  let startDate = req.query.date;
  let idBarbeiro = req.query.idbarbeiro;
  let arrayHorasDisponiveis = [];
  const now = new Date();
  const dummyDate = {
    datetime: {
      $gte: localTime(new Date(new Date(startDate).setHours(00, 00, 00))),
      $lt: localTime(new Date(new Date(startDate).setHours(23, 59, 59))),
    },
    idBarbeiro: idBarbeiro,
  };

  //função que converte datetime UTC para horas (HH:MM)
  function convertUTCDateTimeToTime(valor) {
    if (typeof valor === 'object') valor = JSON.stringify(valor);
    return valor.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
  }
  //Comunicação com MongoDb
  Reserva.find(dummyDate)
    .then((reservas) => {
      if (
        typeof reservas != 'undefined' &&
        reservas != null &&
        reservas.length != null &&
        reservas.length > 0
      ) {
        //Carrega todas as horas disponiveis //
        for (x in dataDisp) {
          let hour = dataDisp[x].hour;
          if (dataDisp[x].hour >= `1970-01-01T00:00:00.000Z`) {
            hour = hour.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
            arrayHorasDisponiveis.push(hour);
          }
        }

        let reservas1 = reservas.map(function (reserva, index) {
          return convertUTCDateTimeToTime(reserva.datetime);
        });

        arrayHorasDisponiveis = arrayHorasDisponiveis.filter(function (val) {
          return reservas1.indexOf(val) == -1;
        });
        //
        // //Senão existir nenhuma reserva marcada, mostra automaticamente todas as horas disponiveis
        //
      } else {
        for (x in dataDisp) {
          arrayHorasDisponiveis.push(convertUTCDateTimeToTime(dataDisp[x].hour));
        }
      }
      res.status(200).json(arrayHorasDisponiveis);
      //**Fim da Promise**//
    })
    .catch(() => {
      res.send('Sorry! Algo correu mal.');
    });
};

const addReserva = (req, res, next) => {
  let ConcactDateTime = req.body.data + 'T' + req.body.hour + ':00';

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errors2 = handleErrors(errors);
    return res.status(400).json({ errors: errors2 });
  }

  const reservaInput = new Reserva({
    idBarbeiro: req.body.barbeiro,
    idService: req.body.tipo_corte,
    datetime: localTime(ConcactDateTime),
    comment: req.body.comentario_cliente,
    clientName: req.body.nome_cliente,
    telephone: req.body.contato_cliente,
    email: req.body.email_cliente,
  });
  console.log(reservaInput);
  reservaInput.save(function (err, reservaInput) {
    if (err) return console.error(err);
    console.log('reserva confirmada');
    res.status(200).json({ reserva: reservaInput });
  });
};

module.exports = {
  index,
  addReserva,
  getReserva,
  getHorasDisponiveis,
};
