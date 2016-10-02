'use strict';

const lib = {
	deps:{
		co:require('co'),
		request:require('co-request'),
		expect:require('chai').expect
	}
};

module.exports = function(p_config, p_expiredToken) {
	it('should refuse connection due to expired token', function() {
		return lib.deps.co(function*() {
			let response = yield lib.deps.request(Object.assign({}, p_config, {
				auth:{
					bearer:p_expiredToken
				}
			}));

			lib.deps.expect(response.statusCode).to.equal(401);
			lib.deps.expect(response.body).to.be.an('object');
			lib.deps.expect(response.body.code).to.equal('auth.expiredToken');
			lib.deps.expect(response.body.message).to.be.a('string');
		});
	});
};