const Reserva = require('../models/reserva');
const dataDisp = require('../reservasDisponiveis.json');
const datasEfect = require('../reservasEfetuadas.json');
const barbeiros = require('../controllers/Barbacon');

const fs = require('fs');

const index = async (req, res) => {
  const arrayBarbeiros = await barbeiros.getBarbeiros();

  res.render('index', { barbeiros: arrayBarbeiros });
};

const getReserva = (req, res) => {
  // VARIABLES //
  let startDate = req.query.date;
  let arrayHorasDisponiveis = [];

  const dummyDate = {
    datetime: {
      $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
      $lt: new Date(new Date(startDate).setHours(23, 59, 59)),
    },
  };

  function teste(valor) {
    if (typeof valor === 'object') valor = JSON.stringify(valor);
    return valor.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
  }

  Reserva.find(dummyDate).then((reservas) => {
    if (
      typeof reservas != 'undefined' &&
      reservas != null &&
      reservas.length != null &&
      reservas.length > 0
    ) {
      //testes

      for (x in dataDisp) {
        let test = dataDisp[x].hour;

        test = test.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
        arrayHorasDisponiveis.push(test);
      }

      let reservas1 = reservas.map(function (reserva, index) {
        return teste(reserva.datetime);
      });

      arrayHorasDisponiveis = arrayHorasDisponiveis.filter(function (val) {
        return reservas1.indexOf(val) == -1;
      });

      console.log('-------');
    } else {
      // //Senão existir nenhuma reserva disponivel mostrar automaticamente todas as horas disponiveis

      for (x in dataDisp) {
        arrayHorasDisponiveis.push(teste(dataDisp[x].hour));
      }
    }
    res.status(200).json(arrayHorasDisponiveis);
    //**Fim da Promise**//
  });
};

const addReserva = (req, res) => {
  let dateInput = {
    date: '12-08-2020',
    idBarbeiro: '5f346a69c4205d1c60c410c6',
  };

  //-> Selecionar Data
  //    -> Mostrar as horas vagas
  //        ->Selecionar a hora pretendida
  //            ->Gravar a marcação

  //Selecionar a data (validar se existe vagas disponiveis -> Se sim mostra as horas vagas)
  // Find episodes that aired on this exact date
  //YYY-MMM-DDD
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
