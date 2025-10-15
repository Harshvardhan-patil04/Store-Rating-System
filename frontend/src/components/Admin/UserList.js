import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import { adminAPI } from '../../services/api';

const UserList = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        address: '',
        role: ''
    });
    const [sortConfig, setSortConfig] = useState({
        sortBy: 'name',
        sortOrder: 'ASC'
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [filters, sortConfig]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await adminAPI.getUsers({
                ...filters,
                ...sortConfig
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
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

    const viewUserDetails = async (userId) => {
        try {
            const response = await adminAPI.getUserDetails(userId);
            setSelectedUser(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <div>
            <Navbar user={user} />
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h2>User List</h2>
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
                        <div className="filter-group">
                            <label>Filter by Role</label>
                            <select
                                name="role"
                                value={filters.role}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Roles</option>
                                <option value="user">Normal User</option>
                                <option value="store">Store Owner</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading">Loading users...</div>
                    ) : users.length === 0 ? (
                        <div className="empty-state">
                            <h3>No users found</h3>
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
                                            onClick={() => handleSort('role')}
                                            className={getSortClass('role')}
                                        >
                                            Role
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>{u.address || 'N/A'}</td>
                                            <td>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '12px',
                                                    backgroundColor: u.role === 'store' ? '#3498db' : '#27ae60',
                                                    color: 'white',
                                                    fontSize: '0.85rem'
                                                }}>
                                                    {u.role === 'store' ? 'Store Owner' : 'Normal User'}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn-primary"
                                                    onClick={() => viewUserDetails(u.id)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {showModal && selectedUser && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '8px',
                        maxWidth: '500px',
                        width: '90%'
                    }}>
                        <h2>User Details</h2>
                        <div style={{ marginTop: '1.5rem' }}>
                            <p><strong>Name:</strong> {selectedUser.name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Address:</strong> {selectedUser.address || 'N/A'}</p>
                            <p><strong>Role:</strong> {selectedUser.role === 'store' ? 'Store Owner' : 'Normal User'}</p>
                            {selectedUser.rating !== undefined && (
                                <p><strong>Rating:</strong> ⭐ {parseFloat(selectedUser.rating).toFixed(2)}</p>
                            )}
                        </div>
                        <button 
                            className="btn-secondary"
                            style={{ marginTop: '1.5rem' }}
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;