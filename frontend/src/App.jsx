import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from "./components/AuthForm"
import Home from "./components/Home"
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import CourseManagement from './components/CourseManagement';
import AssessmentManagement from './components/AssessmentManagement';
import GradeManagement from './components/GradeManagement';
import PrivateRoute from './components/PrivateRoute'; // You'll need to create this component
import NotFound from './components/NotFound'; // You'll need to create this component
import Sidebar  from './components/Sidebar';
function App() {

  return (
    <>
    <AuthProvider>

      <BrowserRouter>
      <Sidebar />

      <Routes>

        <Route path="/login" element={<AuthForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute role="admin"><UserManagement /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><CourseManagement /></PrivateRoute>} />
        <Route path="/assessments" element={<PrivateRoute><AssessmentManagement /></PrivateRoute>} />
        <Route path="/grades" element={<PrivateRoute><GradeManagement /></PrivateRoute>} />
        {/* Redirect or not found routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
