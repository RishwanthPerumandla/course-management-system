const Course = require('../models/Course'); // Ensure the model path is correct

const CourseController = {
    createCourse: async (req, res) => {
        try {
            const { courseName, courseCode, instructorId } = req.body;
            const newCourse = new Course({
                courseName,
                courseCode,
                instructorId
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
            const { courseName, courseCode } = req.body;
            const course = await Course.findByIdAndUpdate(req.params.id, {
                courseName,
                courseCode
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
    }
};

module.exports = CourseController;
