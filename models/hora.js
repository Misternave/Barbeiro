const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horaSchema = new Schema({
    hour: {
        type: Date,
        required: [true, 'Please add Time'],
    },
    idBarbeiro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'barbeiro',
    },
});

const Hora = mongoose.model('HorasDisponiveis', horaSchema);

module.exports = Hora;
