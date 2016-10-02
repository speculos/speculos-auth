'use strict';

const lib = {
	node:{
		path:require('path')
	}
};

/**
	Token issued to hold user credentials.
*/
module.exports.self = {};
module.exports.self.algorithm = 'ES512';
module.exports.self.keys = {};
module.exports.self.keys.public = lib.node.path.resolve(__dirname, '..', 'keys', 'self.pub.pem');
module.exports.self.keys.private = lib.node.path.resolve(__dirname, '..', 'keys', 'self.pkey.pem');
module.exports.self.version = 1;