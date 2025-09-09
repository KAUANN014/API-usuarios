const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middlewares/auth');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};