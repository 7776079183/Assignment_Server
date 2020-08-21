const bcrypt = require('bcrypt-nodejs');
module.exports = {
    encrypt:function(password){ 
        const saltRounds = 10;     
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    decryptAndCompare:function(password,hash){
       return bcrypt.compareSync(password,hash);

    }

}