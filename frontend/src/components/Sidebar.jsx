// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import UserIcon from '@mui/icons-material/Person';
import SurveyIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth provides user role

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { userRole } = useAuth();
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Courses', icon: <SurveyIcon />, path: '/courses' },
        { text: 'Profile', icon: <SurveyIcon />, path: '/profile' },
        // ...(userRole === 'admin' ? [{ text: 'Create Survey', icon: <SurveyIcon />, path: '/surveys/create' }] : []),
        ...(userRole === 'admin' ? [{ text: 'Users', icon: <UserIcon />, path: '/users/' }] : []),  
        // ...(userRole === 'admin' ? [{ text: 'Responses', icon: <UserIcon />, path: '/responses/' }] : [])
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false); // Close the drawer upon selection
    };

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Typography variant="h6" sx={{ my: 2, ml: 1 }}>
                        Menu
                    </Typography>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} onClick={() => handleNavigation(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
};

export default Sidebar;
