const { check, validationResult } = require('express-validator');

const createUserRules = [
    check('nome')
        .exists({ checkNull: true, checkFalsy: true }).withMessage('nome é obrigatório')
        .isString().withMessage('nome deve ser texto')
        .trim()
        .isLength({ min: 3 }).withMessage('nome deve ter no mínimo 3 caracteres'),

    check('email')
        .exists({ checkNull: true, checkFalsy: true }).withMessage('email é obrigatório')
        .isEmail().withMessage('email inválido'),

    check('senha')
        .exists({ checkNull: true, checkFalsy: true }).withMessage('senha é obrigatória')
        .isString().withMessage('senha deve ser texto')
        .isLength({ min: 8 }).withMessage('senha deve ter no mínimo 8 caracteres'),
];

const updateUserRules = [

    check('nome')
        .optional()
        .isString().withMessage('nome deve ser texto')
        .trim()
        .isLength({ min: 3 }).withMessage('nome deve ter no mínimo 3 caracteres'),

    check('email')
        .optional()
        .isEmail().withMessage('email inválido')
        .matches(/\.com$/i).withMessage('email deve terminar em .com'),

    check('senha')
        .optional()
        .isString().withMessage('senha deve ser texto')
        .isLength({ min: 8 }).withMessage('senha deve ter no mínimo 8 caracteres'),
];
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    return res.status(422).json({
        errors: errors.array().map(e => ({ param: e.param, msg: e.msg }))
    });
};

module.exports = {
    createUserRules,
    updateUserRules,
    validate
};