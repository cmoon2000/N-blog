var request = require('supertest');
var settings = require('../settings');
require = require('really-need');

// Thiết lập môi trường test
process.env.NODE_ENV = settings.env.test.name;
process.env.PORT = settings.env.test.port;

exports.site = 'http://localhost:' + settings.env.test.port;

var server;
beforeEach(function () {
	server = require('../app', { bustCache: true });
});
afterEach(function (done) {
	server.close(done);
});
