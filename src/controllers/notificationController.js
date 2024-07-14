const Event = require('../models/Event');
const Lecturer = require('../models/Lecturer');
const sendEmail = require('../utils/sendEmail');

const sendDailyEventNotifications = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay dưới định dạng YYYY-MM-DD
    const events = await Event.find({ date: today }).populate('host participants');
    
    const lecturers = {};

    // Nhóm sự kiện theo giảng viên
    events.forEach(event => {
      event.host.forEach(host => {
        if (!lecturers[host]) lecturers[host] = [];
        lecturers[host].push(event);
      });
      event.participants.forEach(participant => {
        if (!lecturers[participant]) lecturers[participant] = [];
        lecturers[participant].push(event);
      });
    });

    // Tạo và gửi email cho mỗi giảng viên
    for (const lecturerId in lecturers) {
      const lecturer = await Lecturer.findById(lecturerId);
      if (lecturer) {
        const emailContent = generateEmailContent(lecturers[lecturerId]);
        await sendEmail(lecturer.email, 'Today\'s Events', emailContent);
      }
    }

  } catch (error) {
    console.error('Error sending daily event notifications:', error);
  }
};

const generateEmailContent = (events) => {
  return events.map(event => {
    return `Event: ${event.eventName}\nTime: ${event.timeStart} - ${event.timeEnd}\nLocation: ${event.eventLocation}\n\n`;
  }).join('');
};

module.exports = {
  sendDailyEventNotifications
};
