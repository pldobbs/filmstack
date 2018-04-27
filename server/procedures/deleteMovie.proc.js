var db = require('../config/db')

exports.removeMovie = function (movieID, listID) {
    return db.empty('delete_movie', [movieID, listID]);
};