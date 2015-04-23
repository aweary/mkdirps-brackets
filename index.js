var expand 	= require('brace-expansion');
var async  	= require('async');
var fs		= require('fs');
var mkdirp  = require('mkdirp');

module.exports = function(path, options, superCallback){
	
	if (!path || typeof path !== 'string') throw new Error('No valid path(s) provided!');

	/* Dynamically check if we've been provided an option object, redefined argument parameters if so  */
	if (arguments.length === 2) {
		var superCallback = options;
		var options = {};
	};

	var expandedPath = expand(path);

	async.each(expandedPath, function(path, callback){

			/* fs.statSync will throw an error if the file doesn't exist, so wrap in try/catch  */
			try {
				var defined = fs.statSync(path, function(err, stats){ return true; });
			}
			/* We know that if there is an error, the path isn't defined */
			catch (err) {
				var defined = false;
			};

			/* if the path is not defined, make it */
			if (!defined) {
				mkdirp(path, superCallback);
				if(options.onSuccess) options.onSuccess(path);
			}
			/* Otherwise, call the folderExists optional method if it exists */
			else {
				if(options.folderExists) options.folderExists(path);
			}
			
			callback(null);

	});

};
