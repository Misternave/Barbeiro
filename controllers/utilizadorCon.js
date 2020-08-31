const Utilizador = require('../models/utilizador');

const index = async (req, res) => {
  const { email } = req.body;
  try {
    if (await Utilizador.findOne({ email }))
      return res.status(400).send({ erro: 'utilizador já existente' });

    const user = await Utilizador.create(req.body);
    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'Registo falhado' });
  }
};

module.exports = {
  index,
};
