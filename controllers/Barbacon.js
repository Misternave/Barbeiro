const dataBarbeiro = require("../data.json");
const fs = require("fs");

const index = (req, res) => {
  // for (barbeiro in dataBarbeiro.barbeiros) {
  //   console.log(barbeiro.name);
  // }

  res.status(200).json(dataBarbeiro);
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
  const create_at = Date.now();

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

module.exports = { index, addBarbeiro };
