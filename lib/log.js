'use strict';

const lib = {
	deps:{
		bunyan:require('bunyan')
	}
};

function create(p_config) {
	return lib.deps.bunyan.createLogger(Object.assign({}, p_config, {
		serializers:{
			error:lib.deps.bunyan.stdSerializers.err
		}
	}));
}

module.exports.create = create;
