var mdb = require("moviedb")(process.env.TMDB_API_KEY);

exports.getCastCrew = function (id) {
	return new Promise(function (fulfill, reject) {
		mdb.movieCredits({ id: id }, (err, res) => {
			if (err) {
				reject(err);
			} else {
				fulfill(res);
			}
		});
	});
};