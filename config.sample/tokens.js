'use strict';

const lib = {
	node:{
		path:require('path'),
		fs:require('fs')
	}
};

/**
	Token issued to hold user credentials.
*/
module.exports.self = {};
module.exports.self.algorithm = 'ES512';
module.exports.self.keys = {};
module.exports.self.keys.public = lib.node.fs.readFileSync(lib.node.path.resolve(__dirname, '..', 'keys', 'self.pub.pem')).toString();
module.exports.self.keys.private = lib.node.fs.readFileSync(lib.node.path.resolve(__dirname, '..', 'keys', 'self.pkey.pem')).toString();
module.exports.self.version = 1;
