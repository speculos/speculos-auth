'use strict';

module.exports.middleware = function() {
	return function*(p_next) {
		this.parseToken({
			algorithm:this.tokens.self.algorithm,
			publicKey:this.tokens.self.keys.public,
			issuer:this.meta.name + '@' + this.tokens.self.version
		});

		yield p_next;
	};
};