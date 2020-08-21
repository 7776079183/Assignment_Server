const http = require('http');
const express= require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./_config/config');
const cors = require('./_services/cors-service')

server.listen(config.PORT);

app.set('server',server);

app.use(bodyParser.json({
    limit: '20mb'
}));
app.use(bodyParser.urlencoded({
    extended:true,
    limit:'100mb',
}));

app.use(cors);
app.use(express.static('_uploads/'));

mongoose.connect(config.DB_URL+config.HOST+'/'+config.DB,{useNewUrlParser:true,useCreateIndex:true},function(error,database){
    if(error){
        console.log("Not Connected");
    }else{
        console.log("Running...");
    }
})

//test API
/* app.post('/api/test/',function(request,respoance){
    respoance.send({status:'running',body:request.body})
}); */

require('./_routes/routes')(app);