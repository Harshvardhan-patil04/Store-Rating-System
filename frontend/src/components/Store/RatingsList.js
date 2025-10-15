import React from 'react';

const RatingsList = ({ ratings }) => {
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

    if (ratings.length === 0) {
        return (
            <div className="empty-state">
                <h3>No ratings yet</h3>
                <p>Your store hasn't received any ratings yet</p>
            </div>
        );
    }

    return (
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
                    {ratings.map((rating) => (
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
    );
};

export default RatingsList;