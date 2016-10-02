'use strict';

const RIGHT_SEPARATOR = '.';

function has(p_token, p_right) {
	let parts = p_right.toString().split(RIGHT_SEPARATOR);
	let pointer = p_token.rights;
	for(let part of parts) {
		if(pointer === 1) {
			return true;
		} else if(!(part in pointer)) {
			return false;
		}

		pointer = pointer[part];
	}

	return true;
}

function check(p_token, p_right) {
	if(!has(p_token, p_right)) {
		throw new Error('Missing right');
	}
}

function ensure(p_context, p_right) {
	if(!has(p_context.request.token, p_right)) {
		p_context.throw(403, 'Forbidden', {code:'auth.insufficientRights'});
	}
}

function attach() {
	return function*(p_next) {
		let self = this;
		this.rights = {
			has:function(p_right) { return has(self.request.token, p_right); },
			check:function(p_right) { ensure(this, p_right); }
		};

		yield p_next;
	};
}

function middleware(p_right) {
	return function*(p_next) {
		ensure(this, p_right);
		yield p_next;
	};
}

module.exports.has = has;
module.exports.check = check;
module.exports.attach = attach;
module.exports.middleware = middleware;