import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddUser from './components/Admin/AddUser';
import AddStore from './components/Admin/AddStore';  // Add this import
import StoreList from './components/Admin/StoreList';
import UserList from './components/Admin/UserList';
import UserDashboard from './components/User/UserDashboard';
import StoreDashboard from './components/Store/StoreDashboard';
import ChangePassword from './components/User/ChangePassword';
import PrivateRoute from './components/Common/PrivateRoute';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={
                        <PrivateRoute role="admin">
                            <AdminDashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/add-user" element={
                        <PrivateRoute role="admin">
                            <AddUser />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/add-store" element={
                        <PrivateRoute role="admin">
                            <AddStore />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/stores" element={
                        <PrivateRoute role="admin">
                            <StoreList />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/users" element={
                        <PrivateRoute role="admin">
                            <UserList />
                        </PrivateRoute>
                    } />
                    
                    {/* User Routes */}
                    <Route path="/user/dashboard" element={
                        <PrivateRoute role="user">
                            <UserDashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/user/change-password" element={
                        <PrivateRoute role="user">
                            <ChangePassword />
                        </PrivateRoute>
                    } />
                    
                    {/* Store Routes */}
                    <Route path="/store/dashboard" element={
                        <PrivateRoute role="store">
                            <StoreDashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/store/change-password" element={
                        <PrivateRoute role="store">
                            <ChangePassword />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;