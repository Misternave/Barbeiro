const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///Schema///

const projectoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador' },
  },
  { timestamps: true }
);

const Projecto = mongoose.model('Projecto', projectoSchema);

module.exports = Projecto;
