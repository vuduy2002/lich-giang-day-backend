const Event = require("../models/PrivateEvent");

const createEvent = async (req, res) => {
  const event = new Event(req.body);
  console.log(req.body);
  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  // Lấy idLecturer từ URL params
  const idLecturer = req.query.idLecturer;
  // Lấy eventId từ query params nếu có
  const eventId = req.query.eventId;

  const date = req.query.date;

  // Tạo đối tượng điều kiện tìm kiếm
  let filter = { idLecturer };

  // Nếu có eventId, thêm điều kiện vào filter
  if (eventId) {
    filter.eventId = eventId;
  }
  if (date) {
    filter.date = date;
  }
  // console.log(req);
  try {
    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// theo kiểu prams
// const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findOne({ eventId: req.params.id });
//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const updateEvent = async (req, res) => {
  // Lấy eventId từ query params nếu có
  // const eventId = req.query.eventId;

  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  // Lấy eventId từ query params nếu có
  const eventId = req.query.eventId;

  try {
    const deletedEvent = await Event.findOneAndDelete({ eventId });
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  // getEventById,
  updateEvent,
  deleteEvent,
};
