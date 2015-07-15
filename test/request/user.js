var expect  = require('chai').expect;
var request = require('request');
var settings = require('../../settings');
var site = require('../helper').site;

describe('get home page', function () {
	it('returns status 200', function (done) {
		request(site, function (err, res, body) {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});
});

describe('register User', function () {
	describe('Get registerd page', function () {
		it('Returns status 200', function (done) {
			request(site + '/reg', function (err, res, body) {
				expect(res.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe('post a registerd form', function () {

		it('nên từ chối khi password và confirm password không như nhau');
		it('nên từ chối khi password không chứa cả 3 loại uppercase, lowercase, number');
		it('nên từ chối khi password chứa dưới 6 kí tự');
		it('nên từ chối khi email không đúng định dạng');
		it('nên từ chối khi nhập không đầy đủ form đăng ký');
		it('nên từ chối khi tài khoản đã tồn tại')
		
		it('nên chấp nhận form đăng kí đầy đủ', function (done) {
			request.post(
				{
					url: site + '/reg',
					form: {
						name: 'foo',
						password: 'foo',
						'password-repeat': 'foo',
						email: 'foo@gmail.com'
					}
				},
				function (err, res, body) {
					console.log("LOG header", res.header);
					expect(res.header['location']).to.equal('/');
					// expect(res.statusCode).to.equal(301);
					done();
			});
		});
	});

});
