const http = require("http");

const hostname = "localhost";
const port = 8000;

const { findUser } = require("./dbHandlers");


// Add Request Handler to the server
const requestHandler = function (req, res) {
	res.setHeader("Content-Type", "application/json");

	if (req.url === "/books" && req.method === "GET") {
		res.end("Hello from /GET Books");
	} else if (req.url === "/books" && req.method === "POST") {
		res.end("Hello from /POST Books");
	} else if (req.url === "/books" && req.method === "PUT") {
		res.end("Hello from /PUT Books");
	} else if (req.url === "/books" && req.method === "PATCH") {
		res.end("Hello from /PATCH Books");
	} else if (req.url === "/books" && req.method === "DELETE") {
		res.end("Hello from /DELETE Books");
	} else {
		res.writeHead(404);
		res.end(
			JSON.stringify({
				message: "Method Not Supported",
			})
		);
	}
};

// Create the server
const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
