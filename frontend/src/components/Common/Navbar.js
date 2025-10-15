import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const getNavLinks = () => {
        if (user.role === 'admin') {
            return (
                <>
                    <Link to="/admin/dashboard" className="navbar-link">Dashboard</Link>
                    <Link to="/admin/add-user" className="navbar-link">Add User</Link>
                    <Link to="/admin/stores" className="navbar-link">Stores</Link>
                    <Link to="/admin/users" className="navbar-link">Users</Link>
                </>
            );
        } else if (user.role === 'user') {
            return (
                <>
                    <Link to="/user/dashboard" className="navbar-link">Stores</Link>
                    <Link to="/user/change-password" className="navbar-link">Change Password</Link>
                </>
            );
        } else if (user.role === 'store') {
            return (
                <>
                    <Link to="/store/dashboard" className="navbar-link">Dashboard</Link>
                    <Link to="/store/change-password" className="navbar-link">Change Password</Link>
                </>
            );
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">Store Rating System</div>
            <div className="navbar-menu">
                {getNavLinks()}
                <div className="navbar-user">
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;