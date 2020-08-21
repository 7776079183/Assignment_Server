var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '_uploads')
    },
    filename: function (req, file, cb) {
      cb(null, 'product_picture' + '-' + Date.now()+'.jpeg')
    }
  })
   
  var upload = multer({ storage: storage })
  module.exports = function(app){
    const authentication = require('../_controllers/authentication-ctrl');
    const product = require('../_controllers/product-ctrl');
    const JWTService = require('../_services/JWT-service');
    const productValidation = require('../_validations/product-ctrl-validations')
    const authenticationValidtion = require('../_validations/authentication-ctrl-validation');
/* *********************************************** Routes  ************************************************************* */

    app.post('/api/login',authentication.loginUser);
    app.post('/api/register',authenticationValidtion.registerUserValidations,authentication.registerUser);
    //app.get('/api/product-list',JWTService.verifyJWToken,authentication.productList);
    app.post('/api/add-product',JWTService.verifyJWToken,upload.single('file'),productValidation.addProductValidtions,product.addProduct);
    app.put('/api/update-product',JWTService.verifyJWToken,upload.single('file'),productValidation.updateProductValidtions,product.updateProduct);
    app.delete('/api/delete-product/:_id',JWTService.verifyJWToken, product.deleteProduct);
    app.get('/api/products',JWTService.verifyJWToken,product.getProducts);

/* // *********************************************** Routes  ************************************************************* */
}
