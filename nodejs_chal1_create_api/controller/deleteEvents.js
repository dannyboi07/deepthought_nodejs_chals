const deleteEventsRouter = require("express").Router();
const { DeleteEvent } = require("../mongo/delete");
const { ObjectId } = require("mongodb");

deleteEventsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (id) {
        let _id = null;
        try {
            _id = ObjectId(id)
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            })
        }

        try {
            const result = await DeleteEvent(_id);

            if (result.acknowledged) {
                if (result.deletedCount === 1) {
                    res.json({
                        success: true,
                        message: "Deleted event"
                    })
                } else {
                    return res.status(404).json({
                        success: false,
                        message: "Event not found"
                    })
                }
            } else {
                console.error("err deleting event, not acknowledged");
                return res.status(500).json({
                    success: false,
                    message: "Failed to delete event"
                })
            }

        } catch (e) {
            console.error("Err deleting event, err:", e);
            return res.status(500).json({
                success: false,
                message: "Error deleting event"
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "No queries provided"
        })
    }
})

module.exports = deleteEventsRouter;