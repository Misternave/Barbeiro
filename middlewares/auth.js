const jwt = require('jsonwebtoken');
const authConfig = require('../utils/config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: 'Não existe token' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2) return res.status(401).send({ error: 'erro no Token' });

  const [scheme, token] = parts;

  if (!/^Bearer$^/i.test(scheme)) return res.status(401).send({ error: 'Token mal formatado' });

  jwt.verify(token, authConfig.secret, (err, decode) => {
    if (err) return res.status(401).send({ error: 'Token invalido' });

    req.userId = decoded.id;
  });
};
