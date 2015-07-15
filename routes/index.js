var Comment = require('../models/comment');
var crypto  = require('crypto');
var Post    = require('../models/post');
var User    = require('../models/user');

module.exports = function (app)
{
	app.get('/', function (req, res) {
		res.render('index', {
			title   : 'Home',
			posts   : [],
			user    : req.session.user,
			success : req.flash('success').toString(),
			error   : req.flash('error').toString()
		});
	});

	app.get('/reg', checkNotLogin);
	app.get('/reg', function (req, res) {
		res.render('reg', {
			title   : 'registered',
			user    : req.session.user,
			success : req.flash('success').toString(),
			error   : req.flash('error').toString()
		});
	});

	app.post('/reg', checkNotLogin);
	app.post('/reg', function (req, res) {
		res.redirect('/');
	})

	function checkLogin (req, res, next)
	{
		if (!req.session.user) {
			req.flash('eror', 'not logged in!');
			res.redirect('/login');
		}
		next();
	}

	function checkNotLogin (req, res, next)
	{
		if (req.session.user) {
			req.flash('eror', 'has logged!');
			res.redirect('back'); // quay trở lại trang trước đó
		}
		next();
	}
};