const app = require("express")();
require("dotenv").config();
const deleteEventsRouter = require("./controller/deleteEvents");
const getEventsRouter = require("./controller/getEvents");
const postEventsRouter = require("./controller/postEvents");
const putEventsRouter = require("./controller/putEvents");
const { InitMongo, CloseMongo } = require("./mongo/mongo");
const middleware = require("./utils/middleware");

process.once("SIGINT", () => {
	console.log("Received SIGINT, cleaning up...");
	CloseMongo();
	process.exit();
});

process.once("SIGTERM", () => {
	console.log("Received SIGTERM, cleaning up...");
	CloseMongo();
	process.exit();
});

InitMongo();

app.use(middleware.RequestLogger);
app.use("/api/v3/app/events", getEventsRouter);
app.use("/api/v3/app/events", postEventsRouter);
app.use("/api/v3/app/events", putEventsRouter);
app.use("/api/v3/app/events", deleteEventsRouter);

app.use(middleware.UnknownEndpoint);

module.exports = app;
