const Hora = require('../models/hora');

const index = (req, res) => {
    Hora.find()
        .sort({ createdAt: -1 }) //sort allows to change the order by the timestamp
        .then((result) => {
          for(x in result)
          {
              console.log(JSON.stringify(result[x].hour).replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1" ))
          }
// console.log(hour.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1"))
            // res.render('blogs/index', { title: 'Blogs', blogs: result }); // we are passing in the object, the information to the render page tittle, and the blogs
            // the blogs will pass the information retrieve from the DB to the view file
            res.status(200).json(result);
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
}


module.exports = {
    index,
    addHora,
}