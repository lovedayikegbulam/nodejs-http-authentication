const http = require("http");

const hostname = "localhost";
const port = 8000;

const {getBooks} = require("./requestHandler")
const { findUser } = require("./dbHandlers");
const { getBodyFromStream } = require("./buffer");

// Add Request Handler to the server
const requestHandler = async function (req, res) {

	try {

        const body = await getBodyFromStream(req);
		req.body = body;
        // console.log(body)


		if (req.url === "/books" && req.method === "GET") 
            getBooks(req, res);
		if (req.url === "/books" && req.method === "POST")
			getBooks(req, res);
		if (req.url === "/books" && req.method === "PUT")
			getBooks(req, res);
		if (req.url === "/books" && req.method === "PATCH")
			getBooks(req, res);
		if (req.url === "/books" && req.method === "DELETE")
			getBooks(req, res);
	} catch (error) {
		res.statusCode = 500;
		res.end(error.message);
	}
};

// Create the server
const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
