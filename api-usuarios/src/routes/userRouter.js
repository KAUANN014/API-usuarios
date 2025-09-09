const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { createUserRules, updateUserRules, validate } = require('../validators/userValidators');

router.post('/', createUserRules, validate, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', updateUserRules, validate, userController.updateUserPartial);
router.put('/:id', createUserRules, validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;