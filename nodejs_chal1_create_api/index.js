const http = require("http");
const app = require("./app");

http.createServer(app).listen(process.env.PORT, () => {
	console.log(`Server up and running on port ${process.env.PORT}`);
});
