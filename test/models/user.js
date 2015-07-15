var crypto   = require('crypto');
var mongoose = require('mongoose');
var should   = require('should');
var User     = require('../../models/user.js');
var expect   = require('chai').expect;
var mongodb  = require('../../models/db');
var cleardb	 = require('../utils').cleardb;

describe('User', function () {
	describe('#save()', function () {
		after(function (done) {
			cleardb();
			done();
		});

		it('should create a new User', function (done) {
			var md5      = crypto.createHash('md5');
			var newUser = new User({
				name: 'foo',
				password: md5.update('foo').digest('hex'),
				email: 'foo@gmail.com'
			});
			newUser.save(function (err, createdUser) {
				should.not.exist(err);
				createdUser.name.should.equal(newUser.name);
				createdUser.password.should.equal(newUser.password);
				createdUser.email.should.equal(newUser.email);
				done();
			});
		});
	});

	describe('#get()', function () {
		before(function (done) {
			var md5      = crypto.createHash('md5');
			var newUser = new User({
				name: 'foo',
				password: md5.update('foo').digest('hex'),
				email: 'foo@gmail.com'
			});
			newUser.save(function (err, createdUser) {
				should.not.exist(err);
				createdUser.name.should.equal(newUser.name);
				createdUser.password.should.equal(newUser.password);
				createdUser.email.should.equal(newUser.email);
				done();
			});
		});

		after(function (done) {
			cleardb();
			done();
		});

		it('should get an user from name', function (done) {
			var name = 'foo';
			User.get(name, function (err, user) {
				should.not.exist(err);
				user.name.should.equal(name);
				done();
			});
		});
	});
});

