// // CABULAS //
// /*Ficheiros JSON*/
// dataDisp - Horas disponiveis para marcar
// datasEfect - Datas das Reservas efetuadas
// /*Nomes dos Arrays JSON*/
// horasDisp - Horas disponiveis para marcação
// resEfect - Reservas efetuadas

const Reserva = require('../models/reserva');
const dataDisp = require('../reservasDisponiveis.json');
const datasEfect = require('../reservasEfetuadas.json');

const fs = require('fs');

// VARIABLES //
const index = (req, res) => {
    

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

    let startDate = '2020-08-12';

    const dummyDate = {
        datetime: {
            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            $lt: new Date(new Date(startDate).setHours(23, 59, 59)),
        },
    };

    Reserva.find(dummyDate).then((reservas) => {});

    res.status(200).json(reservas);
};

module.exports = {
    index,
    addReserva,
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
