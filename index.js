var expand 	= require('brace-expansion');
var async  	= require('async');
var fs		= require('fs');
var mkdirp  = require('mkdirp');

module.exports = function(path, superCallback){

	if(!path || typeof path !== 'string') throw new Error('No valid path(s) provided!');

	var expandedPath = expand(path);

	async.each(expandedPath, function(path, callback){

			/* fs.statSync will throw an error if the file doesn't exist, so wrap in try/catch  */
			try {
				var defined = fs.statSync(path, function(err, stats){ return true; });
			}
			/* We know that if there is an error, the path isn't defined */
			catch (error) {
				var defined = false;
			};	
			
			/* if the path is not defined, make it */
			if(!defined) {
				mkdirp(path, superCallback);
			};
			
			callback(null);

	});

};
