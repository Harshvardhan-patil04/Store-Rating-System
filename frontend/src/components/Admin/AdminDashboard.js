import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar';
import { adminAPI } from '../../services/api';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await adminAPI.getDashboardStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar user={user} />
            <div className="container">
                <div className="dashboard">
                    <div className="dashboard-header">
                        <h1>Admin Dashboard</h1>
                        <p>Welcome to the system administrator panel</p>
                    </div>

                    {loading ? (
                        <div className="loading">Loading statistics...</div>
                    ) : (
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Users</h3>
                                <div className="stat-value">{stats.totalUsers}</div>
                            </div>
                            <div className="stat-card">
                                <h3>Total Stores</h3>
                                <div className="stat-value">{stats.totalStores}</div>
                            </div>
                            <div className="stat-card">
                                <h3>Total Ratings</h3>
                                <div className="stat-value">{stats.totalRatings}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;