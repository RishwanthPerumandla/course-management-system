// src/components/StudentList.jsx
import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const StudentList = ({ students, courseId }) => {
    const [grades, setGrades] = useState({});

    const handleGradeChange = (studentId, value) => {
        setGrades(prevGrades => ({ ...prevGrades, [studentId]: value }));
    };

    const handleGradeSubmit = async (studentId) => {
        try {
            const grade = grades[studentId];
            await axiosWithAuth.post(`/grades`, {
                studentId,
                courseId,
                grade
            });
            alert('Grade submitted successfully');
        } catch (error) {
            console.error('Failed to submit grade:', error);
            alert('Failed to submit grade');
        }
    };

    return (
        <List>
            {students.map((student) => (
                <ListItem key={student._id} divider>
                    <ListItemText primary={`${student.name} (${student.studentId})`} />
                    <TextField
                        label="Grade"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={grades[student._id] || ''}
                        onChange={(e) => handleGradeChange(student._id, e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleGradeSubmit(student._id)}>
                        Submit Grade
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};

export default StudentList;
