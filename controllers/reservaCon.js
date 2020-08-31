const Reserva = require('../models/reserva');
const dataDisp = require('../reservasDisponiveis.json');
const datasEfect = require('../reservasEfetuadas.json');
const barbeiros = require('../controllers/Barbacon');
const { localTime } = require('../utils/lib');
const fs = require('fs');

const index = async (req, res) => {
  const arrayBarbeiros = await barbeiros.getBarbeiros();

  res.render('index', { barbeiros: arrayBarbeiros });
};

const getReserva = (req, res) => {
  // VARIABLES //
  let startDate = req.query.date;
  let idBarbeiro = req.query.idbarbeiro;
  let arrayHorasDisponiveis = [];

  const dummyDate = {
    datetime: {
      $gte: localTime(new Date(new Date(startDate).setHours(00, 00, 00))),
      $lt: localTime(new Date(new Date(startDate).setHours(23, 59, 59))),
    },
    idBarbeiro: idBarbeiro,
  };

  //funcação que converte datetime UTC para horas (HH:MM)
  function convertUTCDateTimeToTime(valor) {
    if (typeof valor === 'object') valor = JSON.stringify(valor);
    return valor.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
  }
  //Comunicação com MongoDb
  Reserva.find(dummyDate).then((reservas) => {
    console.log('encontrado' + reservas);
    if (
      typeof reservas != 'undefined' &&
      reservas != null &&
      reservas.length != null &&
      reservas.length > 0
    ) {
      for (x in dataDisp) {
        let hour = dataDisp[x].hour;

        hour = hour.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
        arrayHorasDisponiveis.push(hour);
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
  });
};

const addReserva = (req, res) => {
  let ConcactDateTime = req.body.data + 'T' + req.body.hour + ':00';

  const reservaInput = new Reserva({
    idBarbeiro: req.body.barbeiro,
    idService: req.body.tipo_corte,
    datetime: localTime(ConcactDateTime),
    comment: req.body.comentario,
    clientName: req.body.nome_cliente,
    telephone: req.body.contato_cliente,
    email: req.body.email_cliente,
  });

  reservaInput.save(function (err, reservaInput) {
    if (err) return console.error(err);
  });

  res.redirect('/');
};

module.exports = {
  index,
  addReserva,
  getReserva,
};

/*
BACKUP reservas quando usavamos ficheiros
    let dateInput = {
        date: '10-08-2020',
        idBarbeiro: "5f346a69c4205d1c60c410c6",
    };


    let arrayHorasDisponiveis = [];
    let existemReservas = false;
    // END VARIABLES //

    //FUNCTIONS//
    function carregaArrayHoras() {
        for (x in dataDisp) {
            arrayHorasDisponiveis.push(dataDisp[x].hour);
        }
    }
   
   
    function validaSeExistemReservas(datasEfect) {
        for (i in datasEfect) {
            console.log('entrou no 1 FOR - JSON - Datas efetuadas');
            if (
                datasEfect[i].date == dateInput.date &&
                datasEfect[i].idBarbeiro == dateInput.idBarbeiro
            ) {
                console.log('entrou no IF');
                return true;
            }
        }
        return false;
    }

    function mostrarHorasDisponiveis(dataDisp, datasEfect) {
        existemReservas = validaSeExistemReservas(datasEfect);
        carregaArrayHoras();
        if (existemReservas === true) {
            for (i in datasEfect) {
                if (
                    datasEfect[i].date === dateInput.date &&
                    datasEfect[i].idBarbeiro == dateInput.idBarbeiro
                ) {
                    for (x in dataDisp) {
                        if (datasEfect[i].hour === dataDisp[x].hour) {
                            console.log('MATCH' + datasEfect[i].hour + ' ' + dataDisp[x].hour);
                            arrayHorasDisponiveis.splice(x, 1);
                        }
                    }
                }
            }
        } else {
            for (i in dataDisp) {
                arrayHorasDisponiveis.push(dataDisp[i].hour);
            }
        }
    }

    //END FUNCTIONS//
    mostrarHorasDisponiveis(dataDisp, datasEfect);
    res.status(200).json('reserva efetuada');

*/
