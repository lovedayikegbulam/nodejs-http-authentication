const { findUser } = require("./dbHandlers.js");

function authenticate(req, res, next) {
	const { username, password } = req.headers;
	// console.log("authenticate", req.headers);
	const user = findUser(req.headers.username);
	if (!user) {
		res.statusCode = 401;
		res.end();
		return;
	}
	if (user.username !== username || user.password !== password) {
		res.statusCode = 401;
		res.end();
		return;
	}
	next(req, res);
}

module.exports = {
    authenticate
}