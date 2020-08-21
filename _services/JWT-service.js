const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../_config/config');

module.exports = {
    createJWToken:function(payloadData){
        return jwt.encode({ sub: payloadData, iat: moment().unix(), exp: moment().add(config.JWT_TOKEN_VALIDATY, 'days').unix() }, config.JWT_SECRET);
    },
    verifyJWToken:function(request,response,next){
        try {
            if(!request.header('Authorization')) {
                return response.status(401).send({
                    message: 'Please make sure your request has an Authorization header'
                });
            }          
            if (jwt.decode(request.header('Authorization').split(' ')[1],config.JWT_SECRET).exp <= moment().unix()) {
                return response.status(401).send({
                    message: 'Token has expired'
                });
            }else{
                request.body.auth = jwt.decode(request.header('Authorization').split(' ')[1],config.JWT_SECRET).sub;          
                next();
            }
        } catch (error) {
            return response.status(401).send({message:'Unauthorized User'});
        }
    }
}