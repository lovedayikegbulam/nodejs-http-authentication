const fs = require("fs");
const path = require("path");
const url = require('url');

const {addBookToDb, replaceBookInDb, updateBookInDb, deleteBookInDb, getAllBooksFromDb} = require("./dbHandlers");
const { request, get } = require("http");

function getBooks(req, res) {
	// console.log("getBooks", req.body);
	res.setHeader("Content-Type", "application/json");
	getAllBooksFromDb(res);
}

function addBook(req, res) {
	// console.log("addBooks", req.body);
	res.setHeader("Content-Type", "application/json");
	addBookToDb(req.body, res);
}

function replaceBook(req, res){
	// console.log("addBooks", req.body);
	res.setHeader("Content-Type", "application/json");
	replaceBookInDb(req.body, res);
}

function updateBook(req, res){
	res.setHeader("Content-Type", "application/json");
	updateBookInDb(req.body, res);
}

function deleteBook(req, res){
	res.setHeader("Content-Type", "application/json");
	deleteBookInDb(req.body, res)
}


module.exports = {
    getBooks,
	addBook,
	replaceBook,
	updateBook,
	deleteBook
}