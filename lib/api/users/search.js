'use strict';

const lib = {
	models:{
		User:require('../../models/User')
	},
	odm:{
		User:require('../../odm/User')
	}
};

module.exports = function*(p_next) {
	let pagination = this.pagination.parse();
	let orders = this.order.parse(['id', 'email'], '+id');
	let email = this.validate(this.request.query.email, lib.models.User.VALIDATOR_EMAIL.optional());

	let criterias = {
		email:email
	};

	let cursor = this.mongoDb.collection(lib.odm.User.COLLECTION).find(criterias, {_id:1, email:1});

	if(pagination.size) {
		cursor = cursor
			.skip(pagination.page * pagination.size)
			.limit(pagination.size);
	}

	if(orders.length) {
		let sort = {};
		for(let order of orders) {
			sort[order.field] = order.asc ? 1 : -1;
		}

		cursor = cursor.sort(sort);
	}

	let users = [];
	while(yield cursor.hasNext()) {
		let dbUser = yield cursor.next();
		users.push({
			id:dbUser._id.toString(),
			email:dbUser.email
		});
	}

	this.response.body = users;
};