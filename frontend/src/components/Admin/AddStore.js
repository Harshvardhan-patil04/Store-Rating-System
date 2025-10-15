import React, { useState } from 'react';
import Navbar from '../Common/Navbar';
import { adminAPI } from '../../services/api';
import { validateName, validateEmail, validatePassword, validateAddress } from '../../utils/validation';

const AddStore = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const validate = () => {
        const newErrors = {};
        
        const nameError = validateName(formData.name);
        if (nameError) newErrors.name = nameError;
        
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
        
        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;
        
        const addressError = validateAddress(formData.address);
        if (addressError) newErrors.address = addressError;

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            await adminAPI.addStore(formData);
            setMessage({ type: 'success', text: 'Store added successfully' });
            setFormData({
                name: '',
                email: '',
                password: '',
                address: ''
            });
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to add store' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar user={user} />
            <div className="container">
                <div className="card">
                    <h2>Add New Store</h2>
                    {message.text && (
                        <div className={`alert alert-${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Store Name (20-60 characters)</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter store name"
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter store email"
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Password (8-16 chars, 1 uppercase, 1 special char)</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password for store owner"
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label>Address (Max 400 characters)</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter store address"
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Adding Store...' : 'Add Store'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStore;