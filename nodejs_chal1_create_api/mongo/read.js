const { dbClient } = require("./mongo");
const { ObjectId, Timestamp } = require("mongodb");
// const JSONStream = require("JSONStream");

function FindEventById(id) {
	return dbClient.collection("events").findOne({ _id: new ObjectId(id) });
}

function FindEventsByTime(date, limit, skip) {
	// const mongoTs = new Timestamp(date);
	return (
		dbClient
			.collection("events")
			.find({ schedule: { $gte: date } })
			.sort({ schedule: 1 })
			.limit(Number(limit))
			// Assuming request query for the first page will be 1, minus by 1 and multiply by the limiter to get the number of docs to skip.
			// Ex, 1(skip/page) - 1 * 5(limit) = 0, Query for the first page, and it skips 0 records
			// Safety check, check if value below or equal to 0, default to 0 if yes
			.skip(Number(skip) <= 0 ? 0 : (Number(skip) - 1) * Number(limit))
			.toArray()
	);
}

module.exports = {
	FindEventById,
	FindEventsByTime,
};
// .stream()
// .pipe(JSONStream.stringify())
// () => {
//     let first = true;

//     return (data) => {
//         if (first) {
//             first = false;
//             console.log("start");
//             return JSON.stringify(data);
//         }
//         console.log("comma-ing");
//         return "," + JSON.stringify(data);
//     };
// }
