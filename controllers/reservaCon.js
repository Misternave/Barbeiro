const dataReservasDisponiveis = require('../reservasDisponiveis.json');
const dataReservasEfetuadas = require('../reservasEfetuadas.json');

const fs = require('fs');

const index = (req, res) => {
    //VALIDAR disponibilidade da reserva

    let dateInput = {
        date: '11-08-2020',
        idBarbeiro: 1,
    };

    let arrayHorasDisponiveis = [];

    for (i in dataReservasEfetuadas.reservasEfetuadas) {
        console.log('entrou no 1 FOR');
        if (
            dataReservasEfetuadas.reservasEfetuadas[i].date == dateInput.date &&
            dataReservasEfetuadas.reservasEfetuadas[i].idBarbeiro == dateInput.idBarbeiro
        ) {
            console.log('entrou no IF');
            //Descontruir o objeto -> para variaveis separadas
            let { idBarbeiro, date, hour } = dataReservasEfetuadas.reservasEfetuadas[i];

            //SPLICE
            for (x in dataReservasDisponiveis.reservasDisponiveis) {
                // console.log('entrou 2 for');
                // console.log(dataReservasDisponiveis.reservasDisponiveis[x].hour);

                if (
                    dataReservasDisponiveis.reservasDisponiveis[x].hour == hour &&
                    dataReservasDisponiveis.reservasDisponiveis[x].idBarbeiro ==
                        idBarbeiro
                ) {
                    dataReservasDisponiveis.reservasDisponiveis.splice(x, 1);
                }
                arrayHorasDisponiveis.push(
                    dataReservasDisponiveis.reservasDisponiveis[x]
                );
            }
        }
        console.log(arrayHorasDisponiveis);
    }

    res.status(200).json(dataReservasDisponiveis.reservasDisponiveis);
};

module.exports = {
    index,
};
