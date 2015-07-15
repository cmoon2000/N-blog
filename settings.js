module.exports = {
	cookieSecret: 'myblog',
	db: 'blog-dev',
	host: 'localhost',
	port_client: 3000,
	port_client_test: 3006,
	port: 27017,
	db_env: {
		production: "mongodb://user:pass@example.com:1234/stroeski-prod",
		development: "mongodb://localhost/blog-dev",
		test: "mongodb://localhost/blog-test",
	},
	env: {
		test: {
			name: 'test',
			port: 3006
		},
		dev: {
			name: 'dev',
			port: 3000
		}
	}
};