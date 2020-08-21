const { body, param, validationResult } = require('express-validator');
module.exports = {
    registerUserValidations:[
        body('userName').not().isEmpty().withMessage('userName required'),
        body('password').not().isEmpty().withMessage('password required')
    ]
}