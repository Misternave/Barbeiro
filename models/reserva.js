const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///Schema///

const reservaSchema = new Schema(
    {
        name: { type: String, required: true },
        telephone: { type: Number, required: true },
        email: { type: String, required: true },
        idBarbeiro: { type: mongoose.Schema.Types.ObjectId, ref: 'barbeiro' },
        // idUtilizador: { type: Int32, required: true },
        // idServico: { type: In32, required: true },
    },
    { timestamps: true }
);
const Reserva = mongoose.model('Reservas', reservaSchema);

module.exports = Reservas;
