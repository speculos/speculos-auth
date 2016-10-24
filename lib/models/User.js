'use strict';

const lib = {
	node:{
		crypto:require('crypto')
	},
	deps:{
		joi:require('joi')
	}
};

const KEY_SIZE = 32;
const DIGEST_ALGORITHM = 'sha256';

const VALIDATOR_ID = lib.deps.joi.string().regex(/^[a-z0-9]{24}$/).label('user.id');
const VALIDATOR_EMAIL = lib.deps.joi.string().email().max(100).label('user.email');
const VALIDATOR_PASSWORD = lib.deps.joi.string().regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).min(8).max(20).label('user.password');

function generateKey() {
	return lib.node.crypto.randomBytes(KEY_SIZE).toString('hex');
}

function hashPassword(p_clearPassword, p_key) {
	let hmac = lib.node.crypto.createHmac(DIGEST_ALGORITHM, p_key);
	return hmac.update(p_clearPassword).digest('hex');
}

module.exports.VALIDATOR_ID = VALIDATOR_ID;
module.exports.VALIDATOR_EMAIL = VALIDATOR_EMAIL;
module.exports.VALIDATOR_PASSWORD = VALIDATOR_PASSWORD;
module.exports.generateKey = generateKey;
module.exports.hashPassword = hashPassword;
