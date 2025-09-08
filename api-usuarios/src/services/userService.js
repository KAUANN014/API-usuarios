const User = require('../models/user.models');

exports.createUser = async ({ nome, email, senha }) => {
  const user = await User.create({ nome, email, senha });
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

  await user.update(data);
  return user;
};

exports.updateUserPartial = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(data);
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return true;
};
