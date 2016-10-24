'use strict';

const lib = {
	models:{
		User:require('../../models/User')
	},
	odm:{
		User:require('../../odm/User')
	}
};

module.exports = function*() {
	let email = this.validate(this.request.body.email, lib.models.User.VALIDATOR_EMAIL.required());
	let password = this.validate(this.request.body.password, lib.models.User.VALIDATOR_PASSWORD.required());

	let key = lib.models.User.generateKey();
	let hashedPassword = lib.models.User.hashPassword(password, key);

	try {
		let result = yield this.mongoDb.collection(lib.odm.User.COLLECTION).insertOne({
			email:email,
			password:hashedPassword,
			key:key
		});

		this.response.body = {
			id:result.insertedId.toString()
		};
	} catch(p_error) {
		if(p_error.code == 11000) {
			this.throw(409, 'Duplicate user', {code:'user.duplicate'});
		} else {
			throw p_error;
		}
	}
};
