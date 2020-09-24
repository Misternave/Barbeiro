const Utilizador = require('../models/utilizador');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');
const authConfig = require('../utils/config/auth.json');
const { token } = require('morgan');
const { RSA_NO_PADDING } = require('constants');

// Funcões //

// Generate Tokens
const maxAge = 3 * 24 * 60 * 60;
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: maxAge,
  });
}

//Handle Errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //duplicate error code

  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  //incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
  }

  //incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'that incorrect password';
  }

  //validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Fim Funções //

const showRegister = async (req, res) => {
  res.render('register');
};

const register = async (req, res) => {
  const { email, password, passwordrepeat } = req.body;

  //teste errors
  let errors = { name: '', email: '', password: '' };

  //fim teste errors

  try {
    if (await Utilizador.findOne({ email })) {
      errors.email = 'Email já registado';
      return res.status(400).json({ errors });
      // res.status(400).send({ erro: 'utilizador já existente' });
    }

    if (password != passwordrepeat) {
      errors.password = 'Password não coincidem';
      return res.status(400).json({ errors });
    }

    const utilizador = await Utilizador.create(req.body);
    const token = generateToken({ id: utilizador.id });

    //utilizador.password = undefined;
    // res.send({ utilizador, token: generateToken({ id: utilizador.id }) });

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: utilizador._id });
  } catch (err) {
    errors.name = 'Registo falhado';
    return res.status(400).json({ errors });
    // res.status(400).send({ error: 'Registo falhado' });
  }
};

const showAuthenticate = async (req, res) => {
  res.render('authenticate');
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await Utilizador.findOne({ email }).select('+password');

  //teste errors
  let errors = { email: '', password: '' };

  //fim teste errors

  if (!user) {
    errors.email = 'Email não registado';
    //return res.status(404).send({ result: 'Utilizador não encontrado' });
    return res.status(404).json({ errors });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    errors.password = 'Password Invalida';
    return res.status(400).json({ errors });
  }

  // user.password = undefined;
  // res.send({ user, token: generateToken({ id: user.id }) });

  const token = generateToken({ id: user.id });
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ user: user._id });
};

const showLogOut = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

const showForgotPassword = async (req, res) => {
  res.render('forgotpassword');
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

const showResetRassword = async (req, res) => {
  const { token } = req.query;
  res.render('resetpassword', { token: token });
};

const resetPassword = async (req, res) => {
  const { token } = req.query;
  console.log('TOKEN-' + token);
  const { email, password } = req.body;
  // try {
  const user = await Utilizador.findOne({ email }).select(
    '+passwordResetToken passwordResetExpires'
  );

  if (!user) return res.status(400).send({ error: 'erro, utilizador não encontrado' });

  if (token !== user.passwordResetToken) res.status(400).send({ error: 'Token invalido' });

  let now = new Date();

  if (now > user.passwordResetExpires)
    res.status(400).send({ error: 'Token expirado, gere novo sff' });

  user.password = password;

  await user.save(function (err, doc) {
    if (err) return console.error(err);
    console.log('Reset efetuado ');
  });

  res.send();
  // } catch (err) {
  //   res.status(400).send({ error: 'Token invalido' });
  // }
};

module.exports = {
  showRegister,
  register,
  showAuthenticate,
  authenticate,
  showLogOut,
  showForgotPassword,
  forgotPassword,
  showResetRassword,
  resetPassword,
};
