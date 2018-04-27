app.service('SearchCacheService', function() {
	var results;
	
	this.setResults = function(queryResults) {
		results = queryResults;
	};

	this.getResults = function() {
		return results;
	};
});