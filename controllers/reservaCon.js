const dataReservasDisponiveis = require("../reservasDisponiveis.json");
const dataReservasEfetuadas = require("../reservasEfetuadas.json");

const fs = require("fs");

const index = (req, res) => {
  //VALIDAR disponibilidade da reserva

  let dateInput = {
    date: "08-08-2020",
    hour: "10:00",
    idBarbeiro: 1,
  };

  for (i in dataReservasEfetuadas.reservasEfetuadas) {
    if (
      dataReservasEfetuadas.reservasEfetuadas[i].date == dateInput.date &&
      dataReservasEfetuadas.reservasEfetuadas[i].hour == dateInput.hour &&
      dataReservasEfetuadas.reservasEfetuadas[i].idBarbeiro ==
        dateInput.idBarbeiro
    ) {
      console.log(
        `MATCH ${JSON.stringify(
          dataReservasEfetuadas.reservasEfetuadas[i],
          null,
          2
        )}`
      );

      //Descontruir o objeto -> para variaveis separadas
      let { idBarbeiro, date, hour } = dataReservasEfetuadas.reservasEfetuadas[
        i
      ];
      console.log(idBarbeiro + date, hour);

      //SPLICE
      for (x in dataReservasDisponiveis.reservasDisponiveis) {
        // console.log(dataReservasDisponiveis.reservasDisponiveis[x]);
        if (
          // dataReservasDisponiveis.reservasDisponiveis[x].date == date &&
          dataReservasDisponiveis.reservasDisponiveis[x].hour == hour &&
          dataReservasDisponiveis.reservasDisponiveis[x].idBarbeiro ==
            idBarbeiro
        ) {
          dataReservasDisponiveis.reservasDisponiveis.splice(x, 1);
        }
      }

      console.log(
        `MATCH ${JSON.stringify(
          dataReservasDisponiveis.reservasDisponiveis,
          null,
          2
        )}`
      );
    }
  }

  res.status(200).json(dataReservasEfetuadas);
};

module.exports = {
  index,
};
