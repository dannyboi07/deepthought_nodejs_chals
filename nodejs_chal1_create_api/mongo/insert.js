const { dbClient } = require("./mongo");
// const { Timestamp } = require("mongodb");

async function InsertEvent(eventData) {
	return (
		await dbClient.collection("events").insertOne(eventData)
	).insertedId;
}

module.exports = {
	InsertEvent,
};

// {
//     ...eventData,
//     schedule: new Timestamp(eventData.schedule),
// }