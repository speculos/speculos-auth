'use strict';

const lib = {
	deps:{
		joi:require('joi')
	}
};

const VALIDATOR_ORDER = lib.deps.joi.string().regex(/^(\+|-)/).min(2).max(100).label('order');
const VALIDATOR_ORDERS = lib.deps.joi.alternatives().try(VALIDATOR_ORDER, lib.deps.joi.array().items(VALIDATOR_ORDER)).label('orders');

function parse(p_context, p_fields, p_default) {
	let orders = p_context.validate(p_context.request.query.order, VALIDATOR_ORDERS.optional().default(p_default));
	if(!orders) {
		return [];
	}

	let parsedOrders = [];
	for(let order of orders) {
		let sign = order[0];
		parsedOrders.push({
			asc:sign == '+',
			field:order.substr(1)
		});
	}

	return parsedOrders;
}

function attach() {
	return function*(p_next) {
		let self = this;
		this.order = {
			parse:function(p_fields) { return parse(self, p_fields); }
		};

		yield p_next;
	};
}

module.exports.attach = attach;
