const fs = require("fs");
const path = require("path");
const usersDbPath = path.join(__dirname, "db", "users.json");

function findUser(username) {
	const rawText = fs.readFileSync(usersDbPath, "utf8");
	const users = JSON.parse(rawText);
    // console.log("rawText", users);
	return users.find((user) => user.username === username);
}
// const user = findUser(username) : User | null;

module.exports = {
	findUser,
};
