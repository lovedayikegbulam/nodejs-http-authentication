const http = require("http");

const hostname = "localhost";
const port = 8000;

const { findUser } = require("./dbHandlers");
const { getBodyFromStream } = require("./buffer");

// Add Request Handler to the server
const requestHandler = async function (req, res) {
	res.setHeader("Content-Type", "application/json");

	try {
		const header = await getBodyFromStream(req);
		req.headers = header;

		if (req.url === "/books" && req.method === "GET") 
            console.log(req.headers);
            res.end("Hello from /GET Books");
		if (req.url === "/books" && req.method === "POST")
			res.end("Hello from /POST Books");
		if (req.url === "/books" && req.method === "PUT")
			res.end("Hello from /PUT Books");
		if (req.url === "/books" && req.method === "PATCH")
			res.end("Hello from /PATCH Books");
		if (req.url === "/books" && req.method === "DELETE")
			res.end("Hello from /DELETE Books");
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
