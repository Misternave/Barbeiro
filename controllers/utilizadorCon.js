const Utilizador = require('../models/utilizador');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Utilizador.findOne({ email });

    if (!user) return res.status(400).send({ error: 'erro, utilizador não encontrado' });

    const token = crypto.randomBytes(20).toString('hex');

    let now = new Date();
    now.setHours(now.getHours() + 1); //+ 1 Hora (data e tempo da expiração do token)
    console.log('date-' + now);
    console.log('token-' + token);

    await Utilizador.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
      function(err, utilizador) {
        if (err) {
          res.send(err);
        } else {
          res.send(utilizador);
        }
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: 'joaosemedo16@hotmail.com',
        template: 'auth/forgotpassword',
        context: { token },
      },
      (err) => {
        console.log(err);
        if (err) return res.status(400).send({ erro: 'não foi possivel enviar email' });

        return res.send();
      }
    );
  } catch (err) {
    res.status(400).send({ error: 'erro, tente novamente' });
  }
};

module.exports = {
  showRegister,
  register,
  showauthenticate,
  authenticate,
  forgotPassword,
};
