const putEventsRouter = require("express").Router();
const { ObjectId } = require("mongodb");

const multer = require("multer");
const { UpdateEvent } = require("../mongo/update");
const upload = multer({
	limits: {
		fileSize: 5000000, // Max file size of 5MB
	},
});

putEventsRouter.put("/:id", upload.single("files"), async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({
			success: false,
			message: "Missing id in req params",
		});
	} else if (!req.body) {
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
			status: "Missing fields",
		});
	}
	let _id = null;
	try {
		_id = new ObjectId(req.params.id);
	} catch (e) {
		console.error("err converting id to objectId to update event, err:", e);
		return res.status(400).json({
			success: false,
			message: "Invalid id",
		});
	}

	try {
		if (_id) {
			const result = await UpdateEvent(_id, {
				name,
				file: req.file.buffer,
				tagline,
				schedule,
				description,
				moderator,
				category,
				sub_category,
				rigor_rank,
			});
			if (result.acknowledged) {
				if (result.modifiedCount === 1) {
					return res.json({
						success: true,
						message: "Updated event",
					});
				} else if (result.matchedCount === 0) {
					return res.status(404).json({
						success: false,
						message: "Event not found",
					});
				}
			}
		}
		return res.status(500).json({
			success: false,
			message: "Failed to update event",
		});
	} catch (e) {
		console.error(e);
		return res.status(500).json({
			success: false,
			message: "Error updating event",
		});
	}
});

module.exports = putEventsRouter;
