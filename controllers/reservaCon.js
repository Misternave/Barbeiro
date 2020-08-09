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

const index = (req, res) => {
    //VALIDAR disponibilidade da reserva

    let dateInput = {
        date: '11-08-2020',
        idBarbeiro: 2,
    };

    let arrayHorasDisponiveis = [];

    for (i in datasEfect) {
        console.log('entrou no 1 FOR');

        if (
            datasEfect[i].date != dateInput.date &&
            datasEfect[i].idBarbeiro != dateInput.idBarbeiro
        ) {
            console.log('entrou no IF');

            dataDisp.forEach(function (element) {
                arrayHorasDisponiveis.push(element.hour);
            });

            // //Descontruir o objeto -> para variaveis separadas
            // let { idBarbeiro, date, hour } = datasEfect[i];

            // //SPLICE - receber datas disponiveis
            // for (x in dataDisp) {
            //     if (dataDisp[x].hour == hour && dataDisp[x].idBarbeiro == idBarbeiro) {
            //         dataDisp.splice(x, 1);
            //     }
            //     //Copiar  dataDisp.horasDis -> asrray arrayHorasDisponiveis
            // }
        }
    }

    // dataDisp.forEach(function (element) {
    //     arrayHorasDisponiveis.push(element.hour);
    // });

    res.status(200).json(arrayHorasDisponiveis);
};

module.exports = {
    index,
};

/*


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
