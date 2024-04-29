// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, IconButton,ListItemText, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person'; // Assuming you're using this for users
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const Sidebar = ({ open, onOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Courses', icon: <SchoolIcon />, path: '/courses' },
    { text: 'Users', icon: <PersonIcon />, path: '/users/' }
  ];

  return (
    <div>

    <IconButton onClick={onOpen} style={{ color: '#007bff' }} aria-label="open drawer">
                <MenuIcon />
            </IconButton>
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{ width: drawerWidth }}
        role="presentation"
      >
        <Typography variant="h6" sx={{ my: 2 }}>
          Navigation
        </Typography>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => { navigate(item.path); onClose(); }}>
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
