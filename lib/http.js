'use strict';

const lib = {
	node:{
		http:require('http'),
		https:require('https')
	},
	deps:{
		koa:require('koa'),
		koaRouter:require('koa-router'),
		koaCors:require('koa-cors')
	},
	api:require('./api')
};

function create(p_config, p_context) {
	p_context.log.info({port:p_config.PORT, host:p_config.HOST}, 'Initializing HTTP(S) server');

	let app = lib.deps.koa();
	app.on('error', function(p_error, p_context) {
		p_context.log.error({error:p_error});
	});

	app.use(lib.deps.koaCors({
		credentials:true
	}));

	app.use(function*(p_next) {
		for(let key in p_context) {
			this[key] = p_context[key];
		}

		yield p_next;
	});

	app.use(function*(p_next) {
		try {
			yield p_next;
			if(this.status == 404) {
				this.throw(404, 'API not found', {code:'api.notFound'});
			}
		} catch(p_ex) {
			this.status = p_ex.statusCode || 500;
			if(this.status == 500) {
				this.body = {
					message:'Internal server error',
					code:'internal'
				};

				this.app.emit('error', p_ex, this);
			} else {
				this.body = Object.assign({
					message:p_ex.message
				}, p_ex);
			}
		}
	});

	app.use(lib.api.routes(), lib.api.allowedMethods());

	let server;
	if(p_config.HTTPS) {
		server = lib.node.https.createServer(p_config.HTTPS, app.callback());
	} else {
		server = lib.node.http.createServer(app.callback());
	}

	return new Promise(function(p_resolve, p_reject) {
		server.once('error', p_reject);
		server.listen(p_config.PORT, p_config.HOST, p_resolve);
	});
}

module.exports.create = create;
