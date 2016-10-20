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
// module.exports.HTTPS = {
// 	key:lib.node.fs.readFileSync('/path/to/cert.crt').toString(),
// 	cert:lib.node.fs.readFileSync('/path/to/key.pem').toString(),
// 	ca:lib.node.fs.readFileSync('/path/to/ca.pem').toString()
// };