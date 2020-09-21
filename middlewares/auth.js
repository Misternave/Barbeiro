const jwt = require('jsonwebtoken');
const authConfig = require('../utils/config/auth.json');
const Utilizador = require('../models/utilizador');

module.exports = (req, res, next) => {
  // const authToken = req.headers.authorization;

  let authToken = req.cookies.jwt;
  authToken = 'Bearer ' + authToken;

  if (!authToken) {
    res.locals.user = null;
    return res.status(401).send({ error: 'Não existe token' });
  }

  const parts = authToken.split(' ');

  if (!parts.length === 2) {
    res.locals.user = null;
    return res.status(401).send({ error: 'erro no Token' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.locals.user = null;
    return res.status(401).send({ error: 'Token mal formatado' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      res.locals.user = null;
      return res.status(401).send({ error: 'Token invalido' });
    }

    req.userId = decoded.id;

    Utilizador.findById(req.userId, function (err, user) {
      if (err) {
        res.locals.user = null;
        console.log(err);
      } else {
        res.locals.user = user;
        console.log(user);
      }
    });

    return next();
  });
};
