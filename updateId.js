const fs = require("fs");
const path = require("path");

function updateId(filePath) {
	try {
		const data = fs.readFileSync(filePath, "utf8");
		const parsedData = JSON.parse(data);

		let index = 1;
		for (let key in parsedData) {
			parsedData[key].id = index++;
		}

		fs.writeFileSync(filePath, JSON.stringify(parsedData), "utf8");

		console.log(parsedData);
	} catch (error) {
		console.log(error);
	}
}


