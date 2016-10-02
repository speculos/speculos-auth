'use strict';

const lib = {
	node:{
		fs:require('fs')
	},
	deps:{
		co:require('co'),
		promisify:require('tiny-promisify')
	}
};

function load(p_config) {
	return lib.deps.co(function*() {
		let tokens = {};
		for(let tokenName in p_config) {
			let token = p_config[tokenName];
			let keys = {};

			for(let keyName in token.keys) {
				let keyPath = token.keys[keyName];
				let key = yield lib.deps.promisify(lib.node.fs.readFile)(keyPath);
				keys[keyName] = key.toString();
			}

			tokens[tokenName] = {
				algorithm:token.algorithm,
				keys:keys,
				version:token.version,
				expiresIn:token.expiresIn
			};
		}

		return tokens;
	});
}

module.exports.load = load;