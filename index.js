const http = require("http");

const hostname = '0.0.0.0';
const port = 8000;

const {getBooks, addBook, replaceBook, updateBook, deleteBook} = require("./requestHandler")
const { getBodyFromStream } = require("./buffer");
const { authenticate } = require("./authenticate");

// Add Request Handler to the server
const requestHandler = async function (req, res) {

	try {

        const body = await getBodyFromStream(req);
		req.body = body;
        // console.log(body)


		if (req.url === "/books" && req.method === "GET") 
            authenticate(req, res, getBooks);
		if (req.url === "/books" && req.method === "POST")
			authenticate(req, res, addBook);
		if (req.url === "/books" && req.method === "PUT")
			authenticate(req, res, replaceBook);
		if (req.url === "/books" && req.method === "PATCH")
			authenticate(req, res, updateBook);
		if (req.url === "/books" && req.method === "DELETE")
			authenticate(req, res, deleteBook);
		
	} catch (error) {
		res.statusCode = 500;
		res.end(error.message);
	}
};

// Create the server
const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
