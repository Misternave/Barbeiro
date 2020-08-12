const dataBarbeiro = require('../data.json');
const fs = require('fs');
const Barbeiro = require('../models/barbeiro');

const index = (req, res) => {
    Barbeiro.find()
        .sort({ createdAt: -1 }) //sort allows to change the order by the timestamp
        .then((result) => {
            // res.render('blogs/index', { title: 'Blogs', blogs: result }); // we are passing in the object, the information to the render page tittle, and the blogs
            // the blogs will pass the information retrieve from the DB to the view file
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const showBarbeiro = (req, res) => {
    const { id } = req.params;

    //Procura ID barbeiro no ficheiro JSON
    const foundBarbeiro = dataBarbeiro.barbeiros.find(function (barbeiro) {
        return barbeiro.id == id;
    });
    if (!foundBarbeiro) return res.send('Not found Barbeiro');

    res.send(foundBarbeiro);
};

const addBarbeiro = (req, res) => {
    //Recebe os dados do req.body
    //criar objecto com os dados que proveem do req.body (RAW POSTMAN)
    const newBarbas = new Barbeiro(req.body);

    newBarbas.save().catch((err) => {
        console.log(err);
    });

    //Validação dados introduzidos atraves do POSTMAN (só funciona quando tiveremos um formulario)

    // for (barbas of newBarbas) {
    //     if (req.body[barbas] == '' || req.body[barbas] == null) {
    //         return res.send('preencha todos os campo');
    //     }
    // }

    // //Descontruir o objeto -> para variaveis separadas
    // let { name, contact, idBarbeiro, hour, date, email } = req.body;

    // //Valores automaticos
    // //const idBarbeiro = Number(dataBarbeiro.barbeiros.length + 1);

    // //Convert Date format (2020-08-07T22:44:22.343Z to 07/08/2020)
    // var d = new Date();
    // const create_at = d.toISOString().substr(0, 10).split('-').reverse().join('/');

    // dataBarbeiro.barbeiros.push({
    //     name,
    //     contact,
    //     idBarbeiro,
    //     hour,
    //     date,
    //     email,
    // });

    res.status(200).json(newBarbas);

    // fs.writeFile('data.json', JSON.stringify(dataBarbeiro, null, 2), (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved!');
    // });
};

const editBarbeiro = (req, res) => {
    //NOTA//
    //REQ.PARAMS (/1)
    //REQ.BODY (enviado por o body)
    //REQ.querys ( ?page=2&limit=3)
    //FIM NOTA//

    const id = req.params.id;
    let index = 0;

    const foundBarbeiro = dataBarbeiro.barbeiros.find(function (barbeiro, foundIndex) {
        if (id == barbeiro.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundBarbeiro) return res.send('Not found barbeiro');

    //SPREAD - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const barbeiro = {
        ...foundBarbeiro,
        ...req.body,
    };

    dataBarbeiro.barbeiros[index] = barbeiro;

    fs.writeFile('data.json', JSON.stringify(dataBarbeiro, null, 2), function (err) {
        if (err) return res.send('write error');

        return res.send(barbeiro);
    });
};

const deleteBarbeiro = (req, res) => {
    const id = req.params.id;
    let index = 0;

    const foundBarbeiro = dataBarbeiro.barbeiros.find(function (barbeiro, foundIndex) {
        if (id == barbeiro.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundBarbeiro) return res.send('Not found barbeiro');

    dataBarbeiro.barbeiros.splice(index, 1);

    fs.writeFile('data.json', JSON.stringify(dataBarbeiro, null, 2), function (err) {
        if (err) return res.send('write error');

        return res.send('Barbeiro removido');
    });
};

module.exports = {
    index,
    addBarbeiro,
    showBarbeiro,
    editBarbeiro,
    deleteBarbeiro,
};
