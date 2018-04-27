var db = require("../config/db");

exports.all = function() {
    return db.rows("getUsers", []);
};

// exports.read = function(id){
//     return db.row('get_user_by_username', [id]);
// };

exports.read = function(id){
    return db.row('get_user_by_id', [id]);
};

exports.readByUserName = function(username){
    return db.row('get_user_by_username', [username]);
};

exports.write = function(username, email, password){
    return db.row('create_new_user', [username, email, password]);
};

exports.updatePassword = function(id, hash){
    return db.empty('updatePassword', [id, hash]);
};

exports.updateEmail = function(id,email){
    return db.empty('updateEmail', [id, email]);
};

exports.deleteUser = function(id){
    return db.empty('deleteUser', [id]);
};