const mdb = require('moviedb')(process.env.TMDB_API_KEY);

exports.search = function (query) {
	return new Promise(function (fulfill, reject) {
		mdb.searchMovie({ query: query }, (err, res) => {
			if (err) {
				reject(err);
			} else {
				fulfill(res);
			}
		});
	});
};