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
		baseUrl:require('./common/baseUrl'),
		checkMissingTokenHeader:require('./common/checkMissingTokenHeader'),
		checkInvalidTokenHeader:require('./common/checkInvalidTokenHeader'),
		checkInvalidToken:require('./common/checkInvalidToken'),
		checkExpiredToken:require('./common/checkExpiredToken')
	},
	data:{
		users:require('./data/users'),
		tokens:require('./data/tokens')
	}
};

describe('rest.users', function() {
	describe('#GET', function() {
		let config = {
			method:'GET',
			baseUrl:lib.common.baseUrl,
			url:'/users',
			json:true
		};

		lib.common.checkMissingTokenHeader(config);
		lib.common.checkInvalidTokenHeader(config);
		lib.common.checkInvalidToken(config);
		lib.common.checkExpiredToken(config, lib.data.tokens.EXPIRED_ADMIN);

		it('should return available users', function() {
			return lib.deps.co(function*() {
				let response = yield lib.deps.request(Object.assign({}, config, {
					auth:{
						bearer:lib.data.tokens.ADMIN
					}
				}));

				lib.deps.expect(response.statusCode).to.equal(200);
				lib.deps.expect(response.body).to.be.an('array');

				for(let user of response.body) {
					lib.deps.expect(user).to.be.an('object');
					lib.deps.expect(user.id).to.be.a('string');
					lib.deps.expect(user.email).to.be.a('string');
				}
			});
		});
	});

	describe('#POST', function() {
		let config = {
			method:'POST',
			baseUrl:lib.common.baseUrl,
			url:'/users',
			json:true
		};

		lib.common.checkMissingTokenHeader(config);
		lib.common.checkInvalidTokenHeader(config);
		lib.common.checkInvalidToken(config);
		lib.common.checkExpiredToken(config, lib.data.tokens.EXPIRED_ADMIN);

		it('should throw for an already existing user', function() {
			return lib.deps.co(function*() {
				let response = yield lib.deps.request(Object.assign({}, config, {
					auth:{
						bearer:lib.data.tokens.ADMIN
					},
					json:{
						email:lib.data.users.VALID.email,
						password:lib.data.users.VALID.password
					}
				}));

				lib.deps.expect(response.statusCode).to.equal(409);
				lib.deps.expect(response.body).to.be.an('object');
				lib.deps.expect(response.body.code).to.equal('user.duplicate');
				lib.deps.expect(response.body.message).to.be.a('string');
			});
		});
	});

	describe('#DELETE', function() {
		let config = {
			method:'DELETE',
			baseUrl:lib.common.baseUrl,
			url:'/users/' + lib.data.users.VALID.id,
			json:true
		};

		lib.common.checkMissingTokenHeader(config);
		lib.common.checkInvalidTokenHeader(config);
		lib.common.checkInvalidToken(config);
		lib.common.checkExpiredToken(config, lib.data.tokens.EXPIRED_ADMIN);

		it('should throw for an unknown user', function() {
			return lib.deps.co(function*() {
				let response = yield lib.deps.request(Object.assign({}, config, {
					url:'/users/' + lib.data.users.UNKNOWN.id,
					auth:{
						bearer:lib.data.tokens.ADMIN
					}
				}));

				lib.deps.expect(response.statusCode).to.equal(404);
				lib.deps.expect(response.body).to.be.an('object');
				lib.deps.expect(response.body.code).to.equal('user.notFound');
				lib.deps.expect(response.body.message).to.be.a('string');
			});
		});

	});

	describe('END TO END', function() {
		it('should allow user deletion', function() {
			return lib.deps.co(function*() {
				let response = yield lib.deps.request({
					method:'POST',
					baseUrl:lib.common.baseUrl,
					url:'/users',
					auth:{
						bearer:lib.data.tokens.ADMIN
					},
					json:{
						email:lib.data.users.NEW.email,
						password:lib.data.users.NEW.password
					}
				});

				lib.deps.expect(response.statusCode).to.equal(200);
				lib.deps.expect(response.body).to.be.an('object');
				lib.deps.expect(response.body.id).to.be.a('string');

				response = yield lib.deps.request({
					method:'DELETE',
					baseUrl:lib.common.baseUrl,
					url:'/users/' + response.body.id,
					auth:{
						bearer:lib.data.tokens.ADMIN
					}
				});

				lib.deps.expect(response.statusCode).to.equal(204);
			});
		});
	});
});