const cron = require("node-cron");
const sendMail = require("../utils/sendEmail");
const Event = require("../models/Event");
const Lecturer = require("../models/Lecturer");
const Location = require("../models/Location");
const EventType = require("../models/EventType");

const sendDailyNotifications = async () => {
  const newDate = new Date();

  // Format date
  const formattedMonth =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const formattedDate =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const today = `${newDate.getFullYear()}-${formattedMonth}-${formattedDate}`;

  console.log("Checking for events for today:", today);

  const events = await Event.find({ date: today })
    .populate({
      path: "host.lecturerId",
      model: Lecturer,
      localField: "host",
      foreignField: "lecturerId",
      select: "email -_id",
    })
    .populate({
      path: "participants.lecturerId",
      model: Lecturer,
      localField: "participants",
      foreignField: "lecturerId",
      select: "email -_id",
    })
    .populate({
      path: "eventLocation",
      model: Location,
      localField: "eventLocation",
      foreignField: "locationId",
      select: "locationName -_id",
    })
    .populate({
      path: "eventType",
      model: EventType,
      localField: "eventType",
      foreignField: "typeId",
      select: "typeName -_id",
    });
  console.log("Events found:", events.length);
  // console.log("listMail: ", events[0].host);
  // Create a map to group events by lecturer
  const lecturerEventsMap = new Map();

  events.forEach((event) => {
    const addLecturerEvent = (lecturerEmail) => {
      if (!lecturerEventsMap.has(lecturerEmail)) {
        lecturerEventsMap.set(lecturerEmail, []);
      }
      lecturerEventsMap.get(lecturerEmail).push(event);
    };

    // Add host to the lecturerEventsMap
    if (event.host && event.host.length > 0) {
      event.host.forEach((hostLecturer) => {
        if (hostLecturer.lecturerId && hostLecturer.lecturerId.email) {
          addLecturerEvent(hostLecturer.lecturerId.email);
        }
      });
    }

    // Add participants to the lecturerEventsMap
    if (event.participants && event.participants.length > 0) {
      event.participants.forEach((lecturerDetail) => {
        if (lecturerDetail.lecturerId && lecturerDetail.lecturerId.email) {
          addLecturerEvent(lecturerDetail.lecturerId.email);
        }
      });
    }
  });

  // Send emails, avoiding duplicates
  const sentEmails = new Set();

  lecturerEventsMap.forEach((events, email) => {
    if (!sentEmails.has(email)) {
      const emailContent = `

      <h2>Xin chào! Hôm nay bạn sẽ có các sự kiện sau:</h2>
       ${events.map(
         (event) =>
           `<h3>${event.timeStart} - ${event.timeEnd}: ${event?.eventType?.typeName} tại ${event?.eventLocation?.locationName}</h3>`
       )}
      `;
      console.log(`Sending email to ${email}`);
      sendMail(email, "Thông báo sự kiện hàng ngày", emailContent);
      sentEmails.add(email);
    }
  });
};

const dailyNotificationJob = async (req, res) => {
  // Schedule the cron job to run every day at 6 AM
  // cron.schedule("* * * * *", sendDailyNotifications);

  try {
      res.status(200).send("Yêu cầu gửi email đã nhận");
    await sendDailyNotifications();
    console.log("Cron job: Email sent successfully");
  } catch (error) {
    console.error("Cron job: Failed to send email", error);
  }
};

module.exports = dailyNotificationJob;
// module.exports = sendDailyNotifications;
