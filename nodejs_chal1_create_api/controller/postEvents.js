const postEventsRouter = require("express").Router();
const multer = require("multer");
const { InsertEvent } = require("../mongo/insert");
const upload = multer({
	limits: {
		fileSize: 5000000, // Max file size of 5MB
	},
});

postEventsRouter.post("/", upload.single("files"), async (req, res) => {
	if (!req.body) {
		return res.status(400).json({
			success: false,
			message: "Bad request, missing body",
		});
	}
	const {
		name,
		tagline,
		schedule,
		description,
		moderator,
		category,
		sub_category,
		rigor_rank,
	} = req.body;

	if (
		!name ||
		!req.file ||
		!tagline ||
		!schedule ||
		!description ||
		!moderator ||
		!category ||
		!sub_category ||
		!rigor_rank
	) {
		return res.status(400).json({
			success: false,
			message: "Missing fields",
		});
	}

	try {
		res.json({
			success: true,
			data: {
				_id: await InsertEvent({
					name,
					files: req.file.buffer,
					tagline,
					schedule,
					description,
					moderator,
					category,
					sub_category,
					rigor_rank,
				}),
			},
		});

	} catch (e) {
		console.error("Err creating new event, err:", e);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

module.exports = postEventsRouter;
