'use strict';

const lib = {
	deps:{
		joi:require('joi')
	}
};

const VALIDATOR_PAGE = lib.deps.joi.number().integer().min(0).label('pagination.page');
const VALIDATOR_SIZE = lib.deps.joi.number().integer().min(1).label('pagination.size');
const VALIDATOR_ORDER = lib.deps.joi.string().regex(/^(\+|-)/).min(2).max(100).label('order');
const VALIDATOR_ORDERS = lib.deps.joi.alternatives().try(VALIDATOR_ORDER, lib.deps.joi.array().items(VALIDATOR_ORDER)).label('orders');

function parse(p_context, p_config) {
	let config = Object.assign({}, p_config, {
		defaultSize:10,
		maxSize:50
	});

	let validatorSize = VALIDATOR_SIZE.max(config.maxSize);
	if(p_context.rights.has('search.bypassQuotas')) {
		validatorSize = validatorSize.default(null);
	} else {
		validatorSize = validatorSize.default(config.defaultSize);
	}

	return {
		page:p_context.validate(p_context.request.query.page, VALIDATOR_PAGE.optional().default(0)),
		size:p_context.validate(p_context.request.query.page, validatorSize.optional()),
	};
}

function attach() {
	return function*(p_next) {
		let self = this;
		this.pagination = {
			parse:function(p_config) { return parse(self, p_config); }
		};

		yield p_next;
	};
}

module.exports.attach = attach;