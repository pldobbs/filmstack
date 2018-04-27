var mdb = require("moviedb")(process.env.TMDB_API_KEY);

exports.getMovieInfo = function (id) {
	return new Promise(function (fulfill, reject) {
		mdb.movieInfo({ id: id }, (err, res) => {
			if (err) {
				reject(err);
			} else {
				fulfill(res);
			}
		});
	});
};