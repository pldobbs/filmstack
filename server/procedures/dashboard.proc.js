var db = require("../config/db");

exports.showMainList = function(id, mainList) {
    return db.rows('get_main_list', [id, mainList]);
};

exports.showAllLists = function(id) {
    return db.rows('get_all_user_lists', [id]);
};

exports.createList = function(name, id) {
    return db.row('create_new_list', [name, id]);
};

exports.deleteList = function(id) {
    return db.empty('delete_list', [id]);
};

exports.getSingleList = function (userID, listID) {
    return db.rows('get_single_list', [userID, listID]);
};