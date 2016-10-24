'use strict';

const lib = {
	deps:{
		koaRouter:require('koa-router'),
		koaBody:require('koa-body')
	},
	common:{
		validate:require('./common/validate'),
		parseToken:require('./common/parseToken'),
		rights:require('./common/rights'),
		pagination:require('./common/pagination'),
		order:require('./common/order'),
		parseSelfToken:require('./common/parseSelfToken')
	},
	meta:require('./meta'),
	tokens:require('./tokens'),
	users:require('./users')
};

let router = new lib.deps.koaRouter();

router.use(lib.common.validate.attach());
router.use(lib.common.parseToken.attach());
router.use(lib.common.rights.attach());
router.use(lib.common.pagination.attach());
router.use(lib.common.order.attach());

router.get('/meta',
	lib.meta
);

router.post('/tokens',
	lib.deps.koaBody(),
	lib.tokens
);

router.use('/users',
	lib.common.parseSelfToken.middleware(),
	lib.users.routes(),
	lib.users.allowedMethods()
);

module.exports = router;
