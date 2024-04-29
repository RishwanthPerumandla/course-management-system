const Course = require('../models/Course'); // Ensure the model path is correct
const Student = require('../models/Student');
const User = require('../models/User');
const Grade = require('../models/Grade'); // Ensure the model path is correct

const CourseController = {
    createCourse: async (req, res) => {
        try {
            // Assuming that instructorId is being sent as the authenticated user's ID
            const { courseName, courseCode } = req.body;
            const instructorId = req.user._id; // Extracting instructor ID from user object

            const existingCourse = await Course.findOne({ courseCode });
            if (existingCourse) {
                return res.status(409).send({ message: "Course code already exists" });
            }

            const newCourse = new Course({
                courseName,
                courseCode,
                instructorId // Assign the instructor to the course
            });
            await newCourse.save();
            res.status(201).json({ message: "Course created successfully", course: newCourse });
        } catch (error) {
            res.status(500).send({ message: "Error creating course", error: error.message });
        }
    },


    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.find();
            res.json(courses);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving courses", error: error.message });
        }
    },

    getCourseById: async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }
            res.json(course);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving course", error: error.message });
        }
    },

    updateCourse: async (req, res) => {
        try {
            const { courseName, courseCode, students } = req.body;
            // Optional: Validate the student IDs
            // ...

            const course = await Course.findByIdAndUpdate(req.params.id, {
                courseName,
                courseCode,
                $addToSet: { students: { $each: students } } // Add students without duplication
            }, { new: true, runValidators: true });

            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }

            res.json({ message: "Course updated successfully", course });
        } catch (error) {
            res.status(500).send({ message: "Error updating course", error: error.message });
        }
    },

    deleteCourse: async (req, res) => {
        try {
            const course = await Course.findByIdAndDelete(req.params.id);
            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }
            res.send({ message: "Course deleted successfully" });
        } catch (error) {
            res.status(500).send({ message: "Error deleting course", error: error.message });
        }
    },

    // Method to get students by a specific course
getStudentsByCourse: async (req, res) => {
    try {
      const { id } = req.params; // courseId
      const course = await Course.findById(id).populate('students');
      if (!course) {
        return res.status(404).send('Course not found');
      }
      res.json(course.students);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  },

    // This controller method is added to handle the addition of students to a course
    addStudentsToCourse: async (req, res) => {
        try {
            const { studentIds } = req.body; // Expecting an array of student IDs
            const { id } = req.params; // courseId
            
            // Validate that all studentIds are valid ObjectId and exist in the database
            for (const studentId of studentIds) {
                if (!mongoose.Types.ObjectId.isValid(studentId) || !await Student.findById(studentId)) {
                    return res.status(404).send({ message: `Student not found with ID: ${studentId}` });
                }
            }

            const course = await Course.findByIdAndUpdate(
                id,
                { $addToSet: { students: { $each: studentIds } } }, // Prevent duplicate additions
                { new: true }
            ).populate('students');

            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }

            res.json({ message: "Students added to course successfully", course });
        } catch (error) {
            res.status(500).send({ message: "Error adding students to course", error: error.message });
        }
    },


      // Method to grade a student for a specific course
      gradeStudent: async (req, res) => {
        try {
            const { courseId, studentId, score } = req.body;
            // Validate that the instructor is grading for their course
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }
            if (course.instructorId.toString() !== req.user._id.toString()) {
                return res.status(403).send({ message: "You are not authorized to grade this course" });
            }

            // Check if a grade already exists for the student in the context of this course
            let grade = await Grade.findOne({ courseId, studentId });
            if (grade) {
                // Update existing grade
                grade.score = score;
                await grade.save();
            } else {
                // Or create a new grade if one doesn't exist
                grade = new Grade({ courseId, studentId, score });
                await grade.save();
            }

            res.status(200).json({ message: "Grade recorded successfully", grade });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error grading student", error: error.message });
        }
    },
};

module.exports = CourseController;
