const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  // getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/privateEventController");

router.post("/", createEvent);
router.get("/", getAllEvents);
// router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/", deleteEvent);

module.exports = router;
