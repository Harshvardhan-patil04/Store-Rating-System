import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar';
import { storeAPI } from '../../services/api';

const StoreDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [dashboardData, setDashboardData] = useState({
        averageRating: 0,
        ratings: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {  
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const response = await storeAPI.getDashboard();
            setDashboardData(response.data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} className="star filled">★</span>);
            } else {
                stars.push(<span key={i} className="star">☆</span>);
            }
        }
        return stars;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <Navbar user={user} />
            <div className="container">
                <div className="dashboard">
                    <div className="dashboard-header">
                        <h1>Store Dashboard</h1>
                        <p>View your store's ratings and performance</p>
                    </div>

                    {loading ? (
                        <div className="loading">Loading dashboard...</div>
                    ) : (
                        <>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <h3>Average Rating</h3>
                                    <div className="stat-value">
                                        ⭐ {parseFloat(dashboardData.averageRating).toFixed(2)}
                                    </div>
                                    <div className="rating-stars" style={{ marginTop: '0.5rem' }}>
                                        {renderStars(Math.round(dashboardData.averageRating))}
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <h3>Total Ratings</h3>
                                    <div className="stat-value">{dashboardData.ratings.length}</div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h2>User Ratings</h2>
                                </div>

                                {dashboardData.ratings.length === 0 ? (
                                    <div className="empty-state">
                                        <h3>No ratings yet</h3>
                                        <p>Your store hasn't received any ratings yet</p>
                                    </div>
                                ) : (
                                    <div className="table-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>Email</th>
                                                    <th>Rating</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dashboardData.ratings.map((rating) => (
                                                    <tr key={rating.id}>
                                                        <td>{rating.name}</td>
                                                        <td>{rating.email}</td>
                                                        <td>
                                                            <div className="rating-container">
                                                                <div className="rating-stars">
                                                                    {renderStars(rating.rating)}
                                                                </div>
                                                                <span className="rating-value">
                                                                    {rating.rating}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>{formatDate(rating.created_at)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreDashboard;