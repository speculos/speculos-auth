'use strict';

const lib = {
	deps:{
		jwt:require('jsonwebtoken')
	}
};

const PATTERN_HEADER = /^Bearer ([A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]+\.\S+)$/;

function parseToken(p_context, p_config) {
	if(!p_context.header.authorization) {
		p_context.throw(401, 'Unauthorized', {code:'auth.missingHeader'});
	}

	let matches = PATTERN_HEADER.exec(p_context.header.authorization);
	if(!matches) {
		p_context.throw(401, 'Unauthorized', {code:'auth.invalidHeader'});
	}

	try {
		p_context.request.token = lib.deps.jwt.verify(matches[1], p_config.publicKey, {
			algorithms:[p_config.algorithm],
			issuer:p_config.issuer
		});
	} catch(p_ex) {
		if(p_ex.name == 'TokenExpiredError') {
			p_context.throw(401, 'Forbidden', {code:'auth.expiredToken'});
		}

		p_context.log.debug({error:p_ex}, 'JWT verification failed');
		p_context.throw(403, 'Forbidden', {code:'auth.badToken'});
	}
}

function middleware(p_config) {
	return function*(p_next) {
		parseToken(this, p_config);
		yield p_next;
	};
}

function attach() {
	return function*(p_next) {
		let self = this;
		this.parseToken = function(p_config) { return parseToken(self, p_config); };
		yield p_next;
	};
}

module.exports.middleware = middleware;
module.exports.attach = attach;
