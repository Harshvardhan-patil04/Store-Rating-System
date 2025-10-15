import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar';
import { adminAPI } from '../../services/api';

const StoreList = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [sortConfig, setSortConfig] = useState({
        sortBy: 'name',
        sortOrder: 'ASC'
    });

    useEffect(() => {
        fetchStores();
    }, [filters, sortConfig]);

    const fetchStores = async () => {
        setLoading(true);
        try {
            const response = await adminAPI.getStores({
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

    return (
        <div>
            <Navbar user={user} />
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h2>Store List</h2>
                    </div>

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
                            <label>Search by Email</label>
                            <input
                                type="text"
                                name="email"
                                value={filters.email}
                                onChange={handleFilterChange}
                                placeholder="Filter by email"
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
                                            Name
                                        </th>
                                        <th 
                                            onClick={() => handleSort('email')}
                                            className={getSortClass('email')}
                                        >
                                            Email
                                        </th>
                                        <th 
                                            onClick={() => handleSort('address')}
                                            className={getSortClass('address')}
                                        >
                                            Address
                                        </th>
                                        <th 
                                            onClick={() => handleSort('rating')}
                                            className={getSortClass('rating')}
                                        >
                                            Rating
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stores.map((store) => (
                                        <tr key={store.id}>
                                            <td>{store.name}</td>
                                            <td>{store.email}</td>
                                            <td>{store.address || 'N/A'}</td>
                                            <td>
                                                {store.rating > 0 
                                                    ? `⭐ ${parseFloat(store.rating).toFixed(2)}`
                                                    : 'No ratings yet'
                                                }
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

export default StoreList;