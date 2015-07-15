var mongodb = require('./db');
var crypto  = require('crypto');
var async 	= require('async');

/**
 * input:
 *		- user.password được mã hóa
*/
function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}

module.exports = User;

User.prototype.save = function (callback)
{
	var md5 = crypto.createHash('md5'),
		email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
		head = "http://gravatar.com/avatar/" + email_MD5 + "?s=48";
	// thông tin về người dùng để lưu vào cơ sở dữ liệu
	var user = {
		name: this.name,
		password: this.password,
		email: this.email,
		head: head
	};
	async.waterfall([
		function (cb) {
			mongodb.open(function (err, db) {
				if (err)
					return cb(err);
				db.collection('users', function (err, collection) {
					cb(err, collection);
				});
			});
		},
		function (collection, cb) {
			collection.insert(user, {
				safe: true
			}, function (err, user) {
				cb(err, user);
			});
		}
	], function (err, user) {
		mongodb.close();
		if (err)
			return callback(err);
		callback(err, user.ops[0]);
	});
};

User.get = function(name, cb) {
	// Open database
	mongodb.open(function (err, db) {
		if (err)
			return cb(err);
		// đọc users collection
		db.collection('users', function (err, collection) {
			if (err) {
				mongodb.close();
				return cb(err);
			}
			collection.findOne({
				name: name
			}, function (err, user) {
				mongodb.close();
				if (err)
					return cb(err);
				cb(null, user);
			});
		});
	});
};