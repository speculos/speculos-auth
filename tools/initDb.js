'use strict';

const lib = {
	deps:{
		joi:require('joi'),
		minimist:require('minimist'),
		co:require('co'),
		mongoDb:require('mongodb')
	},
	config:{
		log:require('../config/log'),
		mongoDb:require('../config/mongoDb')
	},
	odm:{
		User:require('../lib/odm/User')
	},
	log:require('../lib/log'),
	mongoDb:require('../lib/mongoDb')
};

const VALIDATOR_HELP = lib.deps.joi.boolean().label('help');
const VALIDATOR_OVERRIDE = lib.deps.joi.boolean().label('override');

function printUsage() {
	console.log(`
NAME
	initDb - DB initialisation tool.
SYNOPSIS
	node tools/initDb [-o]
DESCRIPTION
	When invoked, this tool creates the required database if not present in the
	configured MongoDB instance.
OPTIONS
	-h, --help
		Prints this page.
	-o, --override
		Override any existing database specified in the MongoDB configuration
		file.
		Use with care.
EXIT VALUES
	0	Success.
	1	Unspecified error.
	2	Invalid parameter.
`);
}

let args = lib.deps.minimist(process.argv.slice(2), {
	alias:{
		h:'help',
		o:'override'
	},
	boolean:['help', 'override'],
	default:{
		override:false
	}
});

lib.deps.co(function*() {
	try {
		args.help = lib.deps.joi.attempt(args.help, VALIDATOR_HELP.required());
		args.override = lib.deps.joi.attempt(args.override, VALIDATOR_OVERRIDE.required());
	} catch(p_error) {
		printUsage();

		process.exitCode = 2;
		return;
	}

	if(args.help) {
		printUsage();
		return;
	}

	let log = lib.log.create(lib.config.log);
	let db = yield lib.mongoDb.connect(Object.assign({}, lib.config.mongoDb, {
		log:log.child({module:'mongoDb'})
	}));

	try {
		if(args.override) {
			yield db.dropDatabase();
		}

		yield db.collection(lib.odm.User.COLLECTION).createIndex({email:1}, {name:'user.email', unique:true});
	} finally {
		yield db.close();
	}
})
.catch(function(p_error) {
	console.error('ERROR: uncaught exception');
	console.error();
	console.error(p_error.stack);
	console.error();

	process.exitCode = 1;
});
