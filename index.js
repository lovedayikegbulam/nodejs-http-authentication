const http = require("http");

const hostname = "localhost";
const port = 8000;

// Add Request Listener to the server
const requestHandler = function (request, response) {
	response.writeHead(200); // Status code 200 = OK
	response.write("server is working correctly");
	response.end();
};

// Create the server
const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
