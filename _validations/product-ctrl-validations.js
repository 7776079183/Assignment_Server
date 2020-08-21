const { body, param, validationResult } = require('express-validator');
module.exports = {
    addProductValidtions:[
        body('sku_id').not().isEmpty().withMessage('sku_id required'),
        body('name').not().isEmpty().withMessage('name required'),
        body('brand').not().isEmpty().withMessage('brand required'),
        body('category').not().isEmpty().withMessage('category required'),
        body('batch_no').not().isEmpty().withMessage('batch_no required'),
        body('mfg_date').not().isEmpty().withMessage('mfg_date required'),
        body('exp_date').not().isEmpty().withMessage('exp_date required'),
    ],
    updateProductValidtions:[
        body('_id').not().isEmpty().withMessage('_id required'),
        body('name').not().isEmpty().withMessage('name required'),
        body('brand').not().isEmpty().withMessage('brand required'),
        body('category').not().isEmpty().withMessage('category required'),
        body('batch_no').not().isEmpty().withMessage('batch_no required'),
        body('mfg_date').not().isEmpty().withMessage('mfg_date required'),
        body('exp_date').not().isEmpty().withMessage('exp_date required'),
    ]
}