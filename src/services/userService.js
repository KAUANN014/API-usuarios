const User = require('../models/user.models');
const bcrypt = require('bcrypt');

exports.createUser = async ({ nome, email, senha }) => {
  const hashedPassword = await bcrypt.hash(senha, 10);
  const user = await User.create({ nome, email, senha: hashedPassword });
  return user;
};

exports.getAllUsers = async () => {
  return await User.findAll({ attributes: { exclude: ['senha'] } });
};

exports.getUserById = async (id) => {
  return await User.findByPk(id, { attributes: { exclude: ['senha'] } });
};

exports.updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  if (data.senha) {
    data.senha = await bcrypt.hash(data.senha, 10);
  }

  await user.update(data);
  return user;
};

exports.updateUserPartial = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  const allowedFields = ['nome', 'email', 'senha'];
  const updateData = {};

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      updateData[key] = key === 'senha' ? await bcrypt.hash(data[key], 10) : data[key];
    }
  }

  await user.update(updateData);
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return true;
};
