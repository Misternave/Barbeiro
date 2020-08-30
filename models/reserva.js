const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///Schema///

const reservaSchema = new Schema({
  clientName: { type: String },
  telephone: { type: Number },
  email: { type: String },
  idBarbeiro: { type: mongoose.Schema.Types.ObjectId, ref: 'barbeiro' },
  datetime: { type: Date, required: true },
  idService: { type: Number, required: true },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  // idUtilizador: { type: Int32, required: true },
});

// Sets the created_at parameter equal to the current time
reservaSchema.pre('save', function (next) {
  now = new Date();
  offset = now.getTimezoneOffset();
  now = now.setMinutes(now.getMinutes() - offset);
  this.updated_at = now;
  this.created_at = now;

  next();
});
const Reserva = mongoose.model('Reservas', reservaSchema);

module.exports = Reserva;
