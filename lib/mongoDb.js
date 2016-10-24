'use strict';

const lib = {
	deps:{
		mongoDb:require('mongodb')
	}
};

function connect(p_config) {
	p_config.log.info({url:p_config.URL}, 'Initializing MongoDB');

	return lib.deps.mongoDb.connect(p_config.URL, p_config.OPTIONS)
	.then(function (p_db) {
		p_db.ObjectID = lib.deps.mongoDb.ObjectID;
		return p_db;
	});
}

module.exports.connect = connect;
