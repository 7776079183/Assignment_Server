module.exports = function(request , response, next){
    //here we are allowing origians
    var allowedOrigins = ['http://192.168.100.7:4201','http://localhost:4200'];
    
    if(allowedOrigins.indexOf(request.headers.origin)>0){
        response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
    }
    response.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.header('Access-Control-Allow-Credentials', true);
    return next();
}