const getEventsRouter = require("express").Router();
const { FindEventById, FindEventsByTime } = require("../mongo/read");

getEventsRouter.get("/", async (req, res) => {
	const { id, type, limit, page } = req.query;

	if (id) {
		try {
			const resultEvent = await FindEventById(id);

			if (!resultEvent) {
				return res.status(404).json({
					success: true,
					message: "Not found",
				});
			}

			res.json({ success: true, data: resultEvent });
		} catch (e) {
			console.error("err getting event from db", e);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	} else if (type && limit && page) {
		if (isNaN(Number(limit)) || isNaN(Number(page))) {
			return res.status(400).json({
				success: false,
				message: "Unacceptable queries",
			});
		} else if (page <= 0) {
			return res.status(400).json({
				success: false,
				message: "Invalid query param: page",
			});
		}

		// When queried for latest events, get events that will occur within the next 3 days
		if (type === "latest") {
			const yestDate = new Date();
			yestDate.setDate(yestDate.getDate() + 3);

			res.json({
				success: true,
				data: await FindEventsByTime(yestDate, limit, page),
			});
			// res.setHeader("Content-Type", "application/json");
			// res.write("[");
			// FindEventsByTime(yestDate, limit, page)
			// .pipe(res)
			// .on("close", () => {
			// 	console.log("closing", res.writable);
			// 	res.write("]");
			// })
			// .on("finish", () => {
			// 	console.log("finishing", res.writable);
			// 	res.write("]");
			// });
		} else {
			return res.status(501).json({
				success: false,
				message: "To be implemented",
			});
		}
	} else {
		res.status(400).json({
			success: false,
			message: "No queries provided",
		});
	}
});

module.exports = getEventsRouter;
