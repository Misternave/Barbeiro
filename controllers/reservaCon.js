// // CABULAS //
// /*Ficheiros JSON*/
// dataDisp - Horas disponiveis para marcar
// datasEfect - Datas das Reservas efetuadas
// /*Nomes dos Arrays JSON*/
// horasDisp - Horas disponiveis para marcação
// resEfect - Reservas efetuadas

const dataDisp = require('../reservasDisponiveis.json');
const datasEfect = require('../reservasEfetuadas.json');

const fs = require('fs');

// VARIABLES //
const index = (req, res) => {
    let dateInput = {
        date: '10-08-2020',
        idBarbeiro: 1,
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
    res.status(200).json(arrayHorasDisponiveis);
};

module.exports = {
    index,
};

/*
BACKUP CODE - WORKING

const dataDisp = require('../reservasDisponiveis.json');
const datasEfect = require('../reservasEfetuadas.json');

const fs = require('fs');

const index = (req, res) => {
    //VALIDAR disponibilidade da reserva

    let dateInput = {
        date: '10-08-2020',
        idBarbeiro: 1,
    };

    let arrayHorasDisponiveis = [];

    for (i in datasEfect) {
        console.log('entrou no 1 FOR');
        if (
            datasEfect[i].date == dateInput.date &&
            datasEfect[i].idBarbeiro == dateInput.idBarbeiro
        ) {
            console.log('entrou no IF');

            //Descontruir o objeto -> para variaveis separadas
            let { idBarbeiro, date, hour } = datasEfect[i];

            //SPLICE - receber datas disponiveis
            for (x in dataDisp) {
                if (dataDisp[x].hour == hour && dataDisp[x].idBarbeiro == idBarbeiro) {
                    dataDisp.splice(x, 1);
                }
                //Copiar  dataDisp.horasDis -> asrray arrayHorasDisponiveis
            }
        }
    }

    dataDisp.forEach(function (element) {
        arrayHorasDisponiveis.push(element.hour);
    });

    res.status(200).json(arrayHorasDisponiveis);
};

module.exports = {
    index,
};

*/
