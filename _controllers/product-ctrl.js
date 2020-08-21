
const product = require('../_models/product-mdl');
const { validationResult } = require('express-validator');
module.exports = {
    addProduct:function(request,response){
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).send({ errors: errors.array() });
            }
            var prod = new product({
                sku_id:request.body.sku_id,
                name: request.body.name,
                image:'http://localhost:5000/'+ request.file.filename,
                brand:request.body.brand,
                category:request.body.category,
                batch_no:request.body.batch_no,
                mfg_date:request.body.mfg_date,
                exp_date:request.body.exp_date
            });
            return new Promise((resolve,reject)=>{
                prod.save((error,data)=>{
                    if(!error){
                        resolve(data);
                    }else{
                        reject(error);
                    }
                });
            }).then((data)=>{
                response.status(200).send({result:'Success',message:"Product Saved Successfully"});
            }).catch((error)=>{
                console.log(error);
                if(error.errmsg == 'E11000 duplicate key error collection: vivdeas_DB.products index: sku_id_1 dup key: { : \"test_id\" }'){
                    response.status(500).send({result:'fail',message:'sku_id already  exist'});
                }else{
                    response.status(500).send({result:'fail',error:error});
                }  
            })
        } catch (error) {
            console.log(error);
            response.status(500).send({result:'fail',error:error});
        }
    },
    updateProduct:function(request,response){
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).send({ errors: errors.array() });
            }
            var prodUpdate = {
                name: request.body.name,
                brand:request.body.brand,
                category:request.body.category,
                batch_no:request.body.batch_no,
                mfg_date:request.body.mfg_date,
                exp_date:request.body.exp_date
            };
            if(request.file!=undefined){
                prodUpdate.image = 'http://localhost:5000/'+ request.file.filename;
            }
            return new Promise((resolve,reject)=>{
                product.findOneAndUpdate({_id:request.body._id}, prodUpdate, function(error, data) {
                    if(!error){
                        resolve(data);
                    }else{
                        reject(error);
                    }
                });
            }).then((data)=>{
                response.status(200).send({result:'Success',message:"Product Updated Successfully"});
            }).catch((error)=>{
                response.status(500).send({result:'fail',error:error});
            })
        } catch (error) {
            console.log(error)
            response.status(500).send({result:'fail',error:error});
        }
    },

    deleteProduct:function(request,response){
        try {
            if(request.params._id == '' || request.params._id == undefined){
                return response.status(400).send({result:'Fail',message:'_id is required'});
            }
            return new Promise((resolve,reject)=>{
                product.remove({_id:request.params._id}, function(error, data) {
                    if(!error){
                        resolve(data);
                    }else{
                        reject(error);
                    }
                });
            }).then((data)=>{
                if(data.deletedCount){
                    response.status(200).send({result:'Success',message:"Product Deleted Successfully"});
                }else{
                    response.status(500).send({result:'Fail',message:"Product Not Found"});
                }
            }).catch((error)=>{
                response.status(500).send({result:'fail',error:error});
            })
        } catch (error) {
            console.log(error)
            response.status(500).send({result:'fail',error:error});
        }
    },

    getProducts:function(request,response){
        try {
            var condition = {};
            if(request.query._id != undefined){
                condition = {
                    _id:request.query._id
                }
            }
            console.log(condition);
            return new Promise((resolve,reject)=>{
                product.find(condition, function(error, data) {
                    if(!error){
                        resolve(data);
                    }else{
                        reject(error);
                    }
                });
            }).then((data)=>{
                response.status(200).send(data);
            }).catch((error)=>{
                response.status(500).send({result:'fail',error:error});
            })
        } catch (error) {
            console.log(error)
            response.status(500).send({result:'fail',error:error});
        }
    }

}