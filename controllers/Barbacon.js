const dataBarbeiro = require("../data.json");
const fs = require("fs");

const index = (req, res) => {
  res.status(200).json(dataBarbeiro);
};

const addBarbeiro = (req, res) => {
  newBarbas = req.body;

  dataBarbeiro.barbeiros.push(newBarbas);
  res.status(200).json(dataBarbeiro);

  fs.writeFile("data.json", JSON.stringify(dataBarbeiro, null, 2), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

module.exports = { index, addBarbeiro };
