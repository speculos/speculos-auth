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

function* loadUser(p_next) {
	let dbUser = yield this.mongoDb.collection(lib.odm.User.COLLECTION).findOne({
		_id:new this.mongoDb.ObjectID(this.params.user)
	});

	if(!dbUser) {
		this.throw(404, 'User not found', {code:'user.notFound'});
	}

	this.dbUser = dbUser;

	yield p_next;
}

let router = new lib.deps.koaRouter();

router.param('user', function*(p_id, p_next) {
	this.params.user = this.validate(p_id, lib.models.User.VALIDATOR_ID.required());
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
	loadUser,
	lib.remove
);

module.exports = router;
