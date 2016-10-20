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

lib.deps.co(function*() {
	let log = lib.log.create(lib.config.log);
	let meta = yield lib.meta.load();

	let mongoDb = yield lib.mongoDb.connect(Object.assign({}, lib.config.mongoDb, {
		log:log.child({module:'mongoDb'})
	}));

	let http = yield lib.http.create(lib.config.http, {
		log:log.child({module:'http'}),
		meta:meta,
		mongoDb:mongoDb,
		tokens:lib.config.tokens
	});
})
.catch(function(p_error) {
	console.error(p_error.stack);
	process.exitCode = 1;
});