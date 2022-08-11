const { dbClient } = require("./mongo");

async function DeleteEvent(_id) {
	return dbClient.collection("events").deleteOne({ _id });
}

module.exports = {
    DeleteEvent
}