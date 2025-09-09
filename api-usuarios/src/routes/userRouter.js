const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { createUserRules, updateUserRules, validate } = require('../validators/userValidators');
const { authenticateJWT } = require('../middlewares/auth');

router.post('/' , createUserRules, validate, userController.createUser, authenticateJWT);
router.put('/:id', authenticateJWT, createUserRules, validate, userController.updateUser);
router.patch('/:id', authenticateJWT, updateUserRules, validate, userController.updateUserPartial);
router.delete('/:id', authenticateJWT, userController.deleteUser);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;