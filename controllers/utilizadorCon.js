const Utilizador = require('../models/utilizador');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../utils/config/auth.json');

//Funcões
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}
//Fim Funções

const showRegister = async (req, res) => {
  res.render('register');
};
const register = async (req, res) => {
  const { email } = req.body;
  console.log('entrou');
  try {
    if (await Utilizador.findOne({ email })) {
      return res.status(400).send({ erro: 'utilizador já existente' });
    }

    const utilizador = await Utilizador.create(req.body);

    utilizador.password = undefined;

    return res.send({ utilizador, token: generateToken({ id: utilizador.id }) });
  } catch (err) {
    return res.status(400).send({ error: 'Registo falhado' });
  }
};

const showauthenticate = async (req, res) => {
  res.render('authenticate');
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await Utilizador.findOne({ email }).select('+password');

  if (!user) {
    return res.status(404).send({ result: 'Utilizador não encontrado' });
  }

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: 'Password Invalida' });

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id }) });
};

module.exports = {
  showRegister,
  register,
  showauthenticate,
  authenticate,
};
