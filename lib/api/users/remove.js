'use strict';

const lib = {
	odm:{
		User:require('../../odm/User')
	}
};

module.exports = function*() {
	yield this.mongoDb.collection(lib.odm.User.COLLECTION).remove({
		_id:new this.mongoDb.ObjectID(this.params.user)
	});

	this.response.body = null;
};
