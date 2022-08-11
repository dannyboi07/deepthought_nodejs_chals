const { dbClient } = require("./mongo");
// const { Timestamp } = require("mongodb");

function UpdateEvent(_id, eventData) {
	return dbClient.collection("events").replaceOne(
		{ _id },
		eventData,
	);
}

module.exports = {
	UpdateEvent,
};
