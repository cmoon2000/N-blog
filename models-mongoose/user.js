var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	password: String,
	email: String,
	head: String
});

// Export the User model
exports.User = mongoose.model('User', userSchema);