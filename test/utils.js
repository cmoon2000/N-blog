var setting = require('../settings');
var mongoose = require('mongoose');

exports.cleardb = function ()
{
	mongoose.connect(setting.db_env.test, function (err) {
		if (err)
			throw err;
		// Drop the 'foo' collection from the current database
		mongoose.connection.db.dropCollection('users', function(err, result) {
			mongoose.disconnect();
		});

		// Drop the current database
		// mongoose.connection.db.dropDatabase(function(err, result) {...});
		
	});
};