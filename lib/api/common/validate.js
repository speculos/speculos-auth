'use strict';

const lib = {
	deps:{
		joi:require('joi')
	}
};

function validate(p_context, p_value, p_schema, p_options) {
	let result = lib.deps.joi.validate(p_value, p_schema, p_options);
	if(result.error) {
		p_context.throw(409, 'Validation error', {
			code:'validation',
			details:result.error
		});
	}

	return result.value;
}

function attach() {
	return function*(p_next) {
		this.validate = validate.bind(undefined, this);
		yield p_next;
	};
}

module.exports.attach = attach;
