'use strict';

const lib = {
	node:{
		path:require('path'),
		fs:require('fs')
	},
	deps:{
		co:require('co'),
		promisify:require('tiny-promisify')
	}
};

const PACKAGE_PATH = lib.node.path.resolve(__dirname, '..', 'package.json');

function load() {
	return lib.deps.co(function*() {
		let meta = yield lib.deps.promisify(lib.node.fs.readFile)(PACKAGE_PATH);
		return JSON.parse(meta);
	});
}

module.exports.load = load;