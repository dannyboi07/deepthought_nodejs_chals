const { MongoClient } = require("mongodb");

const db = new MongoClient(process.env.MONGODB_URI);

async function InitMongo() {
	console.log("Connecting to database...");
	try {
		await db.connect();
		await db.db(process.env.DB_NAME).command({ ping: 1 });
	} catch (e) {
		console.error("Could not connect to database, exiting, err:", e);
		process.exit(1);
	} finally {
		console.log("Connected to database");
	}
}

async function CloseMongo() {
	console.log("Closing database connection...");
	try {
		await db.close();
	} catch (e) {
		console.log("Err closing connection to database, err:", e);
	} finally {
		console.log("Closed connection to database");
	}
}

module.exports = {
	InitMongo,
    dbClient: db.db(process.env.DB_NAME),
	CloseMongo,
};
