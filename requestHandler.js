const fs = require("fs");
const path = require("path");

const {addBookToDb} = require("./dbHandlers");

function getBooks(req, res) {
	// console.log("getBooks", req.body);
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({ books: [{ name: "Harry Potter" }] }));
}

function addBooks(req, res) {
	console.log("addBooks", req.body);
	res.setHeader("Content-Type", "application/json");
	addBookToDb(req.body);
	res.end(JSON.stringify(req.body));
}


module.exports = {
    getBooks,
	addBooks
}