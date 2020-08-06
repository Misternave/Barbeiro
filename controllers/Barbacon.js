const cenas = require("../cenas.json")
const fs = require("fs")

const index = (req, res) =>{
    res.status(200).json(cenas)
};

const nBarbeiro = (req, res) =>{
    barbas = req.body

    cenas.barbeiros.push(barbas)
    res.status(200).json(cenas)
    
    fs.writeFile( "cenas.json", JSON.stringify(cenas,null, 2 ), (err) =>{
        if (err) throw err;
        console.log('The file has been saved!');
      });

};

module.exports = {index,nBarbeiro}