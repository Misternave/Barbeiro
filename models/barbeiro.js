const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///Schema///

const barbeiroSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Barbeiro = mongoose.model('Barbeiro', barbeiroSchema); //Barbeiro = barbeiros

module.exports = Barbeiro;
