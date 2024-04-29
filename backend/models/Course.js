const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
