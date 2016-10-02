'use strict';

const lib = {
	deps:{
		jwt:require('jsonwebtoken')
	},
	models:{
		User:require('../models/User')
	},
	odm:{
		User:require('../odm/User')
	}
};

function* create(p_next) {
	let email = this.validate(this.request.body.email, lib.models.User.VALIDATOR_EMAIL.required());
	let password = this.validate(this.request.body.password, lib.models.User.VALIDATOR_PASSWORD.required());

	let dbUser = yield this.mongoDb.collection(lib.odm.User.COLLECTION).findOne({
		email:email
	});

	if(!dbUser) {
		this.throw(404, 'User not found', {code:'user.notFound'});
	}

	let hashedPassword = lib.models.User.hashPassword(password, dbUser.key);
	if(hashedPassword != dbUser.password) {
		this.throw(403, 'Password mismatch', {code:'user.passwordMismatch'});
	}

	let token = lib.deps.jwt.sign({
		user:dbUser._id.toString(),
		rights:{}
	}, this.tokens.self.keys.private, {
		algorithm:this.tokens.self.algorithm,
		issuer:this.meta.name + '@' + this.tokens.self.version,
		expiresIn:this.tokens.self.expiresIn
	});

	this.response.body = {
		token:token
	};
}

module.exports = create;