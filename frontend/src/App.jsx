import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import CourseManagement from './components/CourseManagement';
import AssessmentManagement from './components/AssessmentManagement';
import GradeManagement from './components/GradeManagement';
import NotFound from './components/NotFound';
import Sidebar from './components/Sidebar';
import CoursesPage from './components/CoursesPage';
import CourseEdit from './components/CourseEdit';
import CourseDetail from './components/CourseDetail';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,  // Set default margin when sidebar is closed
  ...(open && {
    marginLeft: drawerWidth,  // Adjust marginLeft when sidebar is open
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function App() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <Sidebar open={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose} />
        <Main open={open}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthForm />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/create" element={<CourseEdit />} />
            <Route path="/courses/edit/:courseId" element={<CourseEdit />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/assessments" element={<AssessmentManagement />} />
            <Route path="/grades" element={<GradeManagement />} />
            <Route path="/users/" element={<UserList />} />
            <Route path="/users/create" element={<UserEdit />} />
            <Route path="/users/edit/:userId" element={<UserEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
