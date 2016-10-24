'use strict';

const lib = {
	deps:{
		co:require('co')
	},
	config:{
		log:require('../config/log'),
		mongoDb:require('../config/mongoDb'),
		tokens:require('../config/tokens'),
		http:require('../config/http')
	},
	log:require('./log'),
	meta:require('./meta'),
	mongoDb:require('./mongoDb'),
	http:require('./http')
};

let log = lib.log.create(lib.config.log);
lib.deps.co(function*() {
	let meta = yield lib.meta.load();

	let mongoDb = yield lib.mongoDb.connect(Object.assign({}, lib.config.mongoDb, {
		log:log.child({module:'mongoDb'})
	}));

	yield lib.http.create(lib.config.http, {
		log:log.child({module:'http'}),
		meta:meta,
		mongoDb:mongoDb,
		tokens:lib.config.tokens
	});
})
.catch(function(p_error) {
	log.fatal({error:p_error}, 'Initialization failure');
	process.exitCode = 1;
});
