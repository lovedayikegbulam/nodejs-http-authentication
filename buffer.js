function getBodyFromStream(req) {
	return new Promise((resolve, reject) => {
		const data = [];
		req.on("data", (chunk) => {
			data.push(chunk);
		});
		req.on("end", () => {
			const body = Buffer.concat(data).toString();
			if (body) {
				// assuming that the body is a json object
				resolve(JSON.parse(body));
				return;
			}
			resolve({});
		});

		req.on("error", (err) => {
			reject(err);
		});
	});
}

module.exports = {
    getBodyFromStream
}