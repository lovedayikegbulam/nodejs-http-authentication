const fs = require("fs");
const path = require("path");
const usersDbPath = path.join(__dirname, "db", "users.json");
const booksDbPath = path.join(__dirname, "db", "books.json");

function findUser(username) {
	const rawText = fs.readFileSync(usersDbPath, "utf8");
	const users = JSON.parse(rawText);
    // console.log("rawText", users);
	return users.find((user) => user.username === username);
}
// const user = findUser(username) : User | null;

function updateId(filePath, data) {
	try {
		// const data = fs.readFileSync(filePath, "utf8");
		// const parsedData = JSON.parse(data);

		let index = 1;
		
		data.forEach(element => {
			element.id = index++
		});

		fs.writeFileSync(filePath, JSON.stringify(data), "utf8");

	} catch (error) {
		console.log(error);
	}
}

function addBookToDb(data){
	try {
		const allData = fs.readFileSync(booksDbPath, "utf8");
		const parsedData = JSON.parse(allData)
		parsedData.push(data)
		fs.writeFileSync(booksDbPath, JSON.stringify(parsedData), "utf8");
		updateId(booksDbPath, parsedData)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	findUser,
	updateId,
	addBookToDb
};
