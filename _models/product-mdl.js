var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var productMdl = new mongoose.Schema({
    sku_id: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    brand: {
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    batch_no:{
        type: String,
        required:true
    },
    mfg_date:{
        type: String,
        required:true
    },
    exp_date:{
        type: String,
        required:true
    }
});

productMdl.plugin(timestamps);
module.exports = mongoose.model('product', productMdl);