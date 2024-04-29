// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import axiosWithAuth from './axiosWithAuth';
import { useAxiosWithAuth } from '../hooks/useAxiosWithAuth'; // Import the hook

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const axiosWithAuth = useAxiosWithAuth(); // Use the hook to get axios instance

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosWithAuth.get('/users');
                console.log(response.data)
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, [axiosWithAuth]);

    const handleEdit = (userId) => {
        navigate(`/users/edit/${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
            await axiosWithAuth.delete(`/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));  // Update the local state to reflect the deletion
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleAddUser = () => {
        navigate('/users/create');
    };

    return (
        <Box sx={{ mt: 4, mx: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                User Management
            </Typography>
            <Button variant="contained" onClick={handleAddUser} sx={{ mb: 2 }} color="primary">
                Add New User
            </Button>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(user._id)} color="primary">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(user._id)} color="error">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserList;
