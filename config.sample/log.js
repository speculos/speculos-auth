'use strict';

const lib = {
	node:{
		path:require('path')
	}
};

/**
	The log descriptor.
*/
module.exports = {
	// Log name, embed in all entries.
	name:'speculos.auth',
	// Streams. Refer to the `bunyan` documentation for more information.
	streams:[
		{
			type:'stream',
			level:'debug',
			stream:process.stdout
		},
		{
			type:'rotating-file',
			path:lib.node.path.resolve(__dirname, '..', 'logs', 'speculos.auth'),
			period:'1d',
			count:7
		}
	]
};