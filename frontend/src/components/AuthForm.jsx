import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { TextField, Button, Typography, Container, Tab, Tabs, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function AuthForm() {
    const { user } = useAuth(); // Retrieve the user object from AuthContext

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'instructor'  // Default role set to 'instructor'
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

     // Redirect if already logged in
     useEffect(() => {
        if (user) {
            navigate('/dashboard'); // or another route based on user role
        }
    }, [user, navigate]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isLogin ? 'login' : 'signup';
        try {
            const response = await axios.post(`http://localhost:3000/api/users/${endpoint}`, formData);
            login(response.data.token, response.data.role);
            // Direct users based on their role
            if (response.data.role === "admin") {
                navigate('/dashboard');
            } else if (response.data.role === "instructor") {
                navigate('/dashboard');
            } else {
                navigate('/'); // Default route if role is undefined or unexpected
            }
        } catch (error) {
            console.error('Authentication failed:', error);
            alert(error.response.data.message); // Display backend error message
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Tabs value={isLogin ? 0 : 1} onChange={() => setIsLogin(!isLogin)} aria-label="Login or Register">
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <Typography component="h1" variant="h5">
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {!isLogin && (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={formData.username}
                                onChange={handleChange}
                            />
                        
                        </>
                    )}
                        <FormControl fullWidth margin="normal">
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    label="Role"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="instructor">Instructor</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AuthForm;
