'use strict';

/*
	An user not in the MongoDB database.
*/
module.exports.UNKNOWN = {
	id:'012345012345012345012345',
	email:'user@domain.com',
	password:'Password1'
};

/*
	A valid user in the MongoDB database.
*/
module.exports.VALID = {
	id:'012345012345012345012345',
	email:'valid-user@domain.com',
	password:'CORRECT_PASSWORD'
};

/*
	The same user as previously specified, but with a wrong password.
*/
module.exports.PASSWORD_MISMATCH = {
	email:module.exports.VALID.email,
	password:'Password1'
};

/*
	A new user yet to be created.
*/
module.exports.NEW = {
	email:'new-user@domain.com',
	password:'123NewPass'
};

/*
	Duck variable to ensure that this file has been completed properly.
	Change this value to "true".
*/
module.exports.COMPLETED = false;
