'use strict';

const lib = {
	node:{
		url:require('url')
	},
	config:{
		http:require('../../config/http')
	}
};

module.exports = lib.node.url.format({
	protocol:lib.config.http.HTTPS ? 'https:' : 'http:',
	hostname:'localhost',
	port:lib.config.http.PORT
});