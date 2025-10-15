import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar';
import { userAPI } from '../../services/api';
import { validateRating } from '../../utils/validation';

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        address: ''
    });
    const [sortConfig, setSortConfig] = useState({
        sortBy: 'name',
        sortOrder: 'ASC'
    });
    const [ratingInputs, setRatingInputs] = useState({});
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchStores();
    }, [filters, sortConfig]);

    const fetchStores = async () => {
        setLoading(true);
        try {
            const response = await userAPI.getStores({
                ...filters,
                ...sortConfig
            });
            setStores(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSort = (field) => {
        setSortConfig({
            sortBy: field,
            sortOrder: sortConfig.sortBy === field && sortConfig.sortOrder === 'ASC' ? 'DESC' : 'ASC'
        });
    };

    const getSortClass = (field) => {
        if (sortConfig.sortBy === field) {
            return sortConfig.sortOrder === 'ASC' ? 'sorted-asc' : 'sorted-desc';
        }
        return 'sortable';
    };

    const handleRatingChange = (storeId, value) => {
        setRatingInputs({
            ...ratingInputs,
            [storeId]: value
        });
    };

    const submitRating = async (storeId) => {
        const rating = ratingInputs[storeId] || stores.find(s => s.id === storeId)?.userRating;
        
        const error = validateRating(rating);
        if (error) {
            setMessage({ type: 'error', text: error });
            return;
        }

        try {
            await userAPI.submitRating({ storeId, rating: parseInt(rating) });
            setMessage({ type: 'success', text: 'Rating submitted successfully' });
            fetchStores();
            setRatingInputs({
                ...ratingInputs,
                [storeId]: ''
            });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to submit rating' 
            });
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<span key={i} className="star filled">★</span>);
            } else {
                stars.push(<span key={i} className="star">☆</span>);
            }
        }
        return stars;
    };

    return (
        <div>
            <Navbar user={user} />
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h2>Store List</h2>
                    </div>

                    {message.text && (
                        <div className={`alert alert-${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="filters">
                        <div className="filter-group">
                            <label>Search by Name</label>
                            <input
                                type="text"
                                name="name"
                                value={filters.name}
                                onChange={handleFilterChange}
                                placeholder="Filter by name"
                            />
                        </div>
                        <div className="filter-group">
                            <label>Search by Address</label>
                            <input
                                type="text"
                                name="address"
                                value={filters.address}
                                onChange={handleFilterChange}
                                placeholder="Filter by address"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading">Loading stores...</div>
                    ) : stores.length === 0 ? (
                        <div className="empty-state">
                            <h3>No stores found</h3>
                            <p>Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th 
                                            onClick={() => handleSort('name')}
                                            className={getSortClass('name')}
                                        >
                                            Store Name
                                        </th>
                                        <th 
                                            onClick={() => handleSort('address')}
                                            className={getSortClass('address')}
                                        >
                                            Address
                                        </th>
                                        <th>Overall Rating</th>
                                        <th>Your Rating</th>
                                        <th>Submit/Update Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stores.map((store) => (
                                        <tr key={store.id}>
                                            <td>{store.name}</td>
                                            <td>{store.address || 'N/A'}</td>
                                            <td>
                                                <div className="rating-container">
                                                    <div className="rating-stars">
                                                        {renderStars(store.overallRating)}
                                                    </div>
                                                    <span className="rating-value">
                                                        {parseFloat(store.overallRating).toFixed(2)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                {store.userRating ? (
                                                    <div className="rating-container">
                                                        <div className="rating-stars">
                                                            {renderStars(store.userRating)}
                                                        </div>
                                                        <span className="rating-value">
                                                            {store.userRating}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: '#7f8c8d' }}>Not rated yet</span>
                                                )}
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="5"
                                                        value={ratingInputs[store.id] || store.userRating || ''}
                                                        onChange={(e) => handleRatingChange(store.id, e.target.value)}
                                                        placeholder="1-5"
                                                        style={{
                                                            width: '70px',
                                                            padding: '0.5rem',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px'
                                                        }}
                                                    />
                                                    <button
                                                        className="btn-success"
                                                        onClick={() => submitRating(store.id)}
                                                    >
                                                        {store.userRating ? 'Update' : 'Submit'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;