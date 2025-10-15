const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        const [userCount] = await db.query(
            'SELECT COUNT(*) as count FROM users WHERE role != "admin"'
        );
        const [storeCount] = await db.query('SELECT COUNT(*) as count FROM stores');
        const [ratingCount] = await db.query('SELECT COUNT(*) as count FROM ratings');

        res.json({
            totalUsers: userCount[0].count,
            totalStores: storeCount[0].count,
            totalRatings: ratingCount[0].count
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        const [existingUser] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, address, role]
        );

        if (role === 'store') {
            await db.query(
                'INSERT INTO stores (user_id, name, email, address) VALUES (?, ?, ?, ?)',
                [result.insertId, name, email, address]
            );
        }

        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Add user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getStores = async (req, res) => {
    try {
        const { name, email, address, sortBy = 'name', sortOrder = 'ASC' } = req.query;
        
        let query = `
            SELECT 
                s.id,
                s.name,
                s.email,
                s.address,
                COALESCE(AVG(r.rating), 0) as rating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE 1=1
        `;
        
        const params = [];

        if (name) {
            query += ' AND s.name LIKE ?';
            params.push(`%${name}%`);
        }
        if (email) {
            query += ' AND s.email LIKE ?';
            params.push(`%${email}%`);
        }
        if (address) {
            query += ' AND s.address LIKE ?';
            params.push(`%${address}%`);
        }

        query += ` GROUP BY s.id ORDER BY ${sortBy} ${sortOrder}`;

        const [stores] = await db.query(query, params);

        res.json(stores);
    } catch (error) {
        console.error('Get stores error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const { name, email, address, role, sortBy = 'name', sortOrder = 'ASC' } = req.query;
        
        let query = 'SELECT id, name, email, address, role FROM users WHERE role != "admin"';
        const params = [];

        if (name) {
            query += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }
        if (email) {
            query += ' AND email LIKE ?';
            params.push(`%${email}%`);
        }
        if (address) {
            query += ' AND address LIKE ?';
            params.push(`%${address}%`);
        }
        if (role) {
            query += ' AND role = ?';
            params.push(role);
        }

        query += ` ORDER BY ${sortBy} ${sortOrder}`;

        const [users] = await db.query(query, params);

        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const [users] = await db.query(
            'SELECT id, name, email, address, role FROM users WHERE id = ?',
            [id]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        if (user.role === 'store') {
            const [stores] = await db.query(
                `SELECT s.id, COALESCE(AVG(r.rating), 0) as rating
                 FROM stores s
                 LEFT JOIN ratings r ON s.id = r.store_id
                 WHERE s.user_id = ?
                 GROUP BY s.id`,
                [id]
            );
            
            if (stores.length > 0) {
                user.rating = stores[0].rating;
            }
        }

        res.json(user);
    } catch (error) {
        console.error('Get user details error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addStore = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        // Check if email already exists in users table
        const [existingUser] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if email already exists in stores table
        const [existingStore] = await db.query('SELECT id FROM stores WHERE email = ?', [email]);
        
        if (existingStore.length > 0) {
            return res.status(400).json({ message: 'Store with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with store role
        const [userResult] = await db.query(
            'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, address, 'store']
        );

        // Create store entry
        await db.query(
            'INSERT INTO stores (user_id, name, email, address) VALUES (?, ?, ?, ?)',
            [userResult.insertId, name, email, address]
        );

        res.status(201).json({ message: 'Store added successfully' });
    } catch (error) {
        console.error('Add store error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};