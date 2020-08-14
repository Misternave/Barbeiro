const Hora = require('../models/hora');

const index = (req, res) => {
    Hora.find()
        .sort({ createdAt: -1 }) //sort allows to change the order by the timestamp
        .then((result) => {
            let finalResult = [];

            for (x in result) {
                finalResult.push(
                    JSON.stringify(result[x].hour).replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1')
                );
            }
            res.status(200).json(finalResult);
        })
        .catch((err) => {
            console.log(err);
        });
};

const addHora = (req, res) => {
    // const newDummyHour = new Hora(
    //     {
    //         "hour":  "1970-01-01T09:0:00.000Z"
    //     }
    // );

    newDummyHour.save().catch((err) => {
        console.log(err);
    });

    res.status(200).json(newDummyHour);
};

module.exports = {
    index,
    addHora,
};
