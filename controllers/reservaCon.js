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
        name: 'SemedoTesteManual',
        telephone: '123456789',
        email: 'ds@cortes.com',
        idBarbeiro: 1,
        date: '11-08-2020',
        hour: '10:00',
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
            console.log('NÂO entrou no IF');
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
        return arrayHorasDisponiveis;
    }

    function registarMarcacao() {
        const id = Number(datasEfect.length + 1);

        //Descontruir o objeto -> para variaveis separadas
        let { name, telephone, email, idBarbeiro, date, hour } = dateInput;

        datasEfect.push({
            id,
            name,
            telephone,
            email,
            idBarbeiro,
            date,
            hour,
        });

        if (!validaSeExistemReservas()) {
            fs.writeFile('reservasEfetuadas.json', JSON.stringify(datasEfect, null, 2), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        } else if (validaSeExistemReservas()) {
            console.log(validaSeExistemReservas());
        }
    }

    //END FUNCTIONS//

    //mostrarHorasDisponiveis(dataDisp, datasEfect);
    registarMarcacao();
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
