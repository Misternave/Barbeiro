const dataBarbeiro = require("../data.json");
const fs = require("fs");

const index = (req, res) => {
  res.status(200).json(dataBarbeiro);
};

const showBarbeiro = (req, res) => {
  const { id } = req.params;

  //Procura ID barbeiro no ficheiro JSON
  const foundBarbeiro = dataBarbeiro.barbeiros.find(function (barbeiro) {
    return barbeiro.id == id;
  });
  if (!foundBarbeiro) return res.send("Not found Barbeiro");

  res.send(foundBarbeiro);
};

const addBarbeiro = (req, res) => {
  //Recebe os dados do req.body
  //criar objecto com os dados que proveem do req.body (RAW POSTMAN)
  const newBarbas = Object.keys(req.body);

  //Validação dados introduzidos atraves do POSTMAN (só funciona quando tiveremos um formulario)

  for (barbas of newBarbas) {
    if (req.body[barbas] == "") {
      return res.send("preencha todos os campo");
    }
  }

  //Descontruir o objeto -> para variaveis separadas
  let { name, location, capacity, awards, telephone, email } = req.body;

  //Valores automaticos
  const id = Number(dataBarbeiro.barbeiros.length + 1);

  //Convert Date format (2020-08-07T22:44:22.343Z to 08/07/2020)
  var d = new Date();
  const create_at = d
    .toISOString()
    .substr(0, 10)
    .split("-")
    .reverse()
    .join("/");

  dataBarbeiro.barbeiros.push({
    id,
    name,
    location,
    capacity,
    awards,
    telephone,
    email,
    create_at,
  });

  res.status(200).json(dataBarbeiro);

  fs.writeFile("data.json", JSON.stringify(dataBarbeiro, null, 2), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

const editBarbeiro = (req, res) => {
  //req.body
  const { id } = req.body;
  let index = 0;
  console.log("id-" + id);
  const foundBarbeiro = dataBarbeiro.barbeiros.find(function (
    barbeiro,
    foundIndex
  ) {
    if (id == barbeiro.id) {
      index = foundIndex;
      return true;
    }
  });
  console.log(foundBarbeiro);

  if (!foundBarbeiro) return res.send("Not found instructor");

  //SPREAD - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  const barbeiro = {
    ...foundBarbeiro,
    ...req.body,
  };

  dataBarbeiro.barbeiros[index] = barbeiro;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write error");

    return res.send(barbeiro);
  });
};

module.exports = { index, addBarbeiro, showBarbeiro, editBarbeiro };
