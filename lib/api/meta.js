'use strict';

function* view() {
	this.body = {
		name:this.meta.name,
		version:this.meta.version,
		token:{
			algorithm:this.tokens.self.algorithm,
			publicKey:this.tokens.self.keys.public,
			version:this.tokens.self.version
		}
	};
}

module.exports = view;
