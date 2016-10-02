'use strict';

const lib = {
	deps:{
		koaRouter:require('koa-router'),
		koaBody:require('koa-body')
	},
	models:{
		User:require('../../models/User')
	},
	odm:{
		User:require('../../odm/User')
	},
	search:require('./search'),
	create:require('./create'),
	remove:require('./remove')
};

let router = new lib.deps.koaRouter();

router.param('user', function*(p_id, p_next) {
	this.params.user = this.validate(p_id, lib.models.User.VALIDATOR_ID.required());

	this.dbUser = yield this.mongoDb.collection(lib.odm.User.COLLECTION).findOne({_id:this.mongoDb.ObjectID(this.params.user)});
	if(!this.dbUser) {
		this.throw(404, 'User not found', {code:'user.notFound'});
	}

	yield p_next;
});

router.get('/',
	lib.search
);

router.post('/',
	lib.deps.koaBody(),
	lib.create
);

router.delete('/:user',
	lib.remove
);

module.exports = router;