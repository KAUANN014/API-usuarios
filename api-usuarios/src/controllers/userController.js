const User = require('../models/user.models');

exports.createUser = async (req, res) => {
  try {
    console.log('createUser chamado', req.body);
    const { nome, email, senha } = req.body;

    const user = await User.create({ nome, email, senha });

    res.status(201).json(user); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['senha'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['senha'] } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    user.nome = nome || user.nome;
    user.email = email || user.email;

    if (senha) {
      user.senha = senha;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
