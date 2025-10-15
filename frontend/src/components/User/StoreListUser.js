import React, { useState } from 'react';
import { validateRating } from '../../utils/validation';

const StoreListUser = ({ stores, onRatingSubmit, filters, onFilterChange, onSort, sortConfig }) => {
    const [ratingInputs, setRatingInputs] = useState({});
    const [localMessage, setLocalMessage] = useState({ type: '', text: '' });

    const handleRatingChange = (storeId, value) => {
        setRatingInputs({
            ...ratingInputs,
            [storeId]: value
        });
        setLocalMessage({ type: '', text: '' });
    };

    const submitRating = async (storeId) => {
        const rating = ratingInputs[storeId] || stores.find(s => s.id === storeId)?.userRating;
        
        const error = validateRating(rating);
        if (error) {
            setLocalMessage({ type: 'error', text: error });
            return;
        }

        try {
            await onRatingSubmit(storeId, parseInt(rating));
            setRatingInputs({
                ...ratingInputs,
                [storeId]: ''
            });
            setLocalMessage({ type: 'success', text: 'Rating submitted successfully' });
            setTimeout(() => setLocalMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setLocalMessage({ 
                type: 'error', 
                text: 'Failed to submit rating' 
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

    const getSortClass = (field) => {
        if (sortConfig.sortBy === field) {
            return sortConfig.sortOrder === 'ASC' ? 'sorted-asc' : 'sorted-desc';
        }
        return 'sortable';
    };

    if (stores.length === 0) {
        return (
            <div className="empty-state">
                <h3>No stores found</h3>
                <p>Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div>
            {localMessage.text && (
                <div className={`alert alert-${localMessage.type}`}>
                    {localMessage.text}
                </div>
            )}

            <div className="filters">
                <div className="filter-group">
                    <label>Search by Name</label>
                    <input
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={onFilterChange}
                        placeholder="Filter by name"
                    />
                </div>
                <div className="filter-group">
                    <label>Search by Address</label>
                    <input
                        type="text"
                        name="address"
                        value={filters.address}
                        onChange={onFilterChange}
                        placeholder="Filter by address"
                    />
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th 
                                onClick={() => onSort('name')}
                                className={getSortClass('name')}
                            >
                                Store Name
                            </th>
                            <th 
                                onClick={() => onSort('address')}
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
        </div>
    );
};

export default StoreListUser;