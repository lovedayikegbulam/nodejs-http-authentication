function getBooks(req, res) {
	console.log("getBooks", req.body);
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({ books: [{ name: "Harry Potter" }] }));
}


module.exports = {
    getBooks
}