'use strict';

/**
	The HTTP server binding host.
	Defaults to 0.0.0.0 (aka. full exposition).
*/
module.exports.HOST = '0.0.0.0';

/**
	The HTTP server port.
	Note that the defaults are:
		- HTTP: 80
		- HTTPS: 443
*/
module.exports.PORT = 80;

/**
	The HTTPS optional configuration.
	If uncommented, creates a HTTPS instance rather than a non secure HTTP one.
*/
// module.exports.HTTPS = {};

/**
	Certificate to use for the HTTPS server.
*/
// module.exports.HTTPS.CERT = '/path/to/cert.crt';

/**
	Private key of the HTTPS certificate.
*/
// module.exports.HTTPS.KEY = '/path/to/key.pem';

/**
	Optional CA file.
	If uncommented, this file must hold the HTTP server root & intermediates certificates chain.
*/
// module.exports.HTTPS.CA = '/path/to/ca.pem';