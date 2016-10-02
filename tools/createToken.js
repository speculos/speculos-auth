'use strict';

const lib = {
	deps:{
		joi:require('joi'),
		minimist:require('minimist'),
		co:require('co'),
		jwt:require('jsonwebtoken')
	},
	config:{
		tokens:require('../config/tokens')
	},
	models:{
		User:require('../lib/models/User')
	},
	meta:require('../lib/meta'),
	tokens:require('../lib/tokens')
};

const EXPIRATION_INTERVAL_NEVER = 'never';

const VALIDATOR_HELP = lib.deps.joi.boolean().label('help');
const VALIDATOR_ADMIN = lib.deps.joi.boolean().label('admin');
const VALIDATOR_EXPIRES_IN = lib.deps.joi.string().min(1).max(20).label('expiresIn');

function printUsage() {
	console.log(`
NAME
	createToken - Token creation tool.
SYNOPSIS
	node tools/createToken [-a] [-u USER] [-e EXPIRATION_INTERVAL]
DESCRIPTION
	When invoked, this tool creates a unique token signed with the server
	private key.
	By default, this token doesn't hold any rights.
OPTIONS
	-h, --help
		Prints this page.
	-a, --admin
		Grants the token full administration rights.
	-u, --user USER
		Specify the USER id. By default the tool use a string full of 0s.
		The USER id must comply with the MongoDB ObjectID format.
	-e, --expiresIn EXPIRATION_INTERVAL
		A string representation of the token expiration time relative to the
		current date. If the EXPIRATION_INTERVAL equals "infinity", the token won't
		expire. Defaults to "30 days".
		Example: "5m" for five minutes ; "8 seconds" for eight seconds ; ...
		For more information about the syntax, please refer to the [ms] node
		module.
EXIT VALUES
	0	Success.
	1	Unspecified error.
	2	Invalid parameter.
`);
}

let args = lib.deps.minimist(process.argv.slice(2), {
	alias:{
		h:'help',
		a:'admin',
		u:'user',
		e:'expiresIn'
	},
	boolean:['help', 'admin'],
	string:['user', 'expiresIn'],
	default:{
		help:false,
		user:'000000000000000000000000',
		admin:false,
		expiresIn:'30 days'
	}
});

lib.deps.co(function*() {
	try {
		args.help = lib.deps.joi.attempt(args.help, VALIDATOR_HELP.required());
		args.admin = lib.deps.joi.attempt(args.admin, VALIDATOR_ADMIN.required());
		args.user = lib.deps.joi.attempt(args.user, lib.models.User.VALIDATOR_ID.required());
		args.expiresIn = lib.deps.joi.attempt(args.expiresIn, VALIDATOR_EXPIRES_IN.required());
	} catch(p_error) {
		printUsage();

		process.exitCode = 2;
		return;
	}

	if(args.help) {
		printUsage();
		return;
	}

	let meta = yield lib.meta.load();
	let tokens = yield lib.tokens.load(lib.config.tokens);

	console.log(lib.deps.jwt.sign({
		user:args.user,
		rights:(args.admin) ? 1 : {}
	}, tokens.self.keys.private, {
		algorithm:tokens.self.algorithm,
		issuer:meta.name + '@' + tokens.self.version,
		expiresIn:args.expiresIn && args.expiresIn != EXPIRATION_INTERVAL_NEVER ? args.expiresIn : undefined
	}));
})
.catch(function(p_error) {
	console.error('ERROR: uncaught exception');
	console.error();
	console.error(p_error.stack);
	console.error();

	process.exitCode = 1;
});