var bcrypt = require('bcrypt');
const saltRounds = 12;

/*
Take a plain-text password and encrypt it 
*/
exports.encryptPassword = function (password) {
    return new Promise(function(resolve, reject){
        bcrypt.hash(password, saltRounds, function(err, hash){
            if(err){
                reject(err);
            } else{
                resolve(hash);
            }
        })
    })
}

exports.checkPassword = function(password, hash){
    return new Promise(function(resolve, reject){
        bcrypt.compare(password, hash, function(err, matches){
            if(err){
                reject(err)
            }else{
                resolve(matches);
            }
        })
    })
}