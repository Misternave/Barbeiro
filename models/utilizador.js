const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

///Schema///

const utilizadorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

utilizadorSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  now = new Date();
  offset = now.getTimezoneOffset();
  now = now.setMinutes(now.getMinutes() - offset);
  this.updated_at = now;
  this.created_at = now;

  next();
});

const Utilizador = mongoose.model('Utilizador', utilizadorSchema);

module.exports = Utilizador;
