export const validateName = (name) => {
    if (!name || name.trim().length < 20 || name.trim().length > 60) {
        return 'Name must be between 20 and 60 characters';
    }
    return '';
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return 'Please provide a valid email';
    }
    return '';
};

export const validatePassword = (password) => {
    if (!password || password.length < 8 || password.length > 16) {
        return 'Password must be between 8 and 16 characters';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!/[!@#$%^&*]/.test(password)) {
        return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return '';
};

export const validateAddress = (address) => {
    if (address && address.length > 400) {
        return 'Address must not exceed 400 characters';
    }
    return '';
};

export const validateRating = (rating) => {
    const ratingNum = Number(rating);
    if (!rating || ratingNum < 1 || ratingNum > 5 || !Number.isInteger(ratingNum)) {
        return 'Rating must be a whole number between 1 and 5';
    }
    return '';
};