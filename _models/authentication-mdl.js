var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var authentication = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    userType: {
        type: Number,
        required:true,
        default:1 
    },
    
});

authentication.plugin(timestamps);
module.exports = mongoose.model('authentication', authentication);