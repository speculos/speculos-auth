'use strict';

const lib = {
	node:{
		url:require('url')
	},
	deps:{
		co:require('co'),
		request:require('co-request'),
		expect:require('chai').expect
	},
	common:{
		baseUrl:require('./common/baseUrl')
	},
	data:{
		users:require('./data/users')
	}
};

describe('rest.tokens', function() {
	describe('#POST', function() {
		let config = {
			method:'POST',
			baseUrl:lib.common.baseUrl,
			url:'/tokens',
			json:true
		};

		it('should throw for missing or invalid credentials', function() {
			return lib.deps.co(function*() {
				let response = yield lib.deps.request(Object.assign({}, config, {
					json:{
						email:'test'
					}
				}));

				lib.deps.expect(response.statusCode).to.equal(409);
				lib.deps.expect(response.body).to.be.an('object');
				lib.deps.expect(response.body.code).to.equal('validation');
				lib.deps.expect(response.body.message).to.be.a('string');
			});
		});

		it('should throw for unknown user', function() {
			return lib.deps.co(function*() {
				let response = yield lib.deps.request(Object.assign({}, config, {
					json:{
						email:lib.data.users.UNKNOWN.email,
						password:lib.data.users.UNKNOWN.password
					}
				}));

				lib.deps.expect(response.statusCode).to.equal(404);
				lib.deps.expect(response.body).to.be.an('object');
				lib.deps.expect(response.body.code).to.equal('user.notFound');
				lib.deps.expect(response.body.message).to.be.a('string');
			});
		});

		it('should throw for mismatching password', function() {
			return lib.deps.co(function*() {
				let response = yield lib.deps.request(Object.assign({}, config, {
					json:{
						email:lib.data.users.PASSWORD_MISMATCH.email,
						password:lib.data.users.PASSWORD_MISMATCH.password
					}
				}));

				lib.deps.expect(response.statusCode).to.equal(403);
				lib.deps.expect(response.body).to.be.an('object');
				lib.deps.expect(response.body.code).to.equal('user.passwordMismatch');
				lib.deps.expect(response.body.message).to.be.a('string');
			});
		});

		it('should return exchange token', function() {
			return lib.deps.co(function*() {
				let response = yield lib.deps.request(Object.assign({}, config, {
					json:{
						email:lib.data.users.VALID.email,
						password:lib.data.users.VALID.password
					}
				}));

				lib.deps.expect(response.statusCode).to.equal(200);
				lib.deps.expect(response.body).to.be.an('object');
				lib.deps.expect(response.body.token).to.be.a('string');
			});
		});
	});
});