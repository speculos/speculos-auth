'use strict';

const lib = {
	data:{
		tokens:require('./data/tokens'),
		users:require('./data/users')
	}
};

describe('!data', function() {
	it('configuration files must be checked', function() {
		for(let name in lib.data) {
			if(!lib.data[name].COMPLETED) {
				throw new Error('Test data file [' + name + '] not properly completed, please recheck it.');
			}
		}
	});
});