const Projecto = require('../models/projeto');

const getProject = async (req, res) => {
  try {
    // console.log('netrou');
    const projecto = await Projecto.find({ user: req.userId }).populate('utilizador');
    console.log(projecto);
    return res.send({ projecto });
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao carregar projetos' });
  }
};

const postProject = async (req, res) => {
  try {
    const projecto = await Projecto.create({ ...req.body, user: req.userId });

    return res.send({ projecto });
  } catch (err) {
    return res.status(400).send({ error: 'error criar novo projeto' });
  }
};

module.exports = {
  getProject,
  postProject,
};
