import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';

import AdminDashboard from './pages/dashboard/AdminDashboard';
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import HTEDashboard from './pages/dashboard/HTEDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';

import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './routes/ProtectedRoute'; //wrapper

const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/email-verify' element={<EmailVerify />} />
          <Route path='/reset-password' element={<ResetPassword />} />

          {/* Unauthorized Route */ }

          <Route path='/unauthorized' element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["hte"]} />}>
            <Route path="/hte-dashboard" element={<HTEDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Route>

        </Routes>
    </div>
  )
}

export default App