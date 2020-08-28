const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///Schema///

const reservaSchema = new Schema(
  {
    clientName: { type: String },
    telephone: { type: Number },
    email: { type: String },
    idBarbeiro: { type: mongoose.Schema.Types.ObjectId, ref: 'barbeiro' },
    datetime: { type: Date, required: true },
    idService: { type: Number, required: true },
    comment: { type: String },
    // idUtilizador: { type: Int32, required: true },
  },
  { timestamps: true }
);
const Reserva = mongoose.model('Reservas', reservaSchema);

module.exports = Reserva;
