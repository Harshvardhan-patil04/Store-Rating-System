const db = require('../config/db');

exports.getStores = async (req, res) => {
    try {
        const { name, address, sortBy = 'name', sortOrder = 'ASC' } = req.query;
        const userId = req.user.id;
        
        let query = `
            SELECT 
                s.id,
                s.name,
                s.address,
                COALESCE(AVG(r.rating), 0) as overallRating,
                ur.rating as userRating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = ?
            WHERE 1=1
        `;
        
        const params = [userId];

        if (name) {
            query += ' AND s.name LIKE ?';
            params.push(`%${name}%`);
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

exports.submitRating = async (req, res) => {
    try {
        const { storeId, rating } = req.body;
        const userId = req.user.id;

        const [existingRating] = await db.query(
            'SELECT id FROM ratings WHERE user_id = ? AND store_id = ?',
            [userId, storeId]
        );

        if (existingRating.length > 0) {
            await db.query(
                'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
                [rating, userId, storeId]
            );
            res.json({ message: 'Rating updated successfully' });
        } else {
            await db.query(
                'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
                [userId, storeId, rating]
            );
            res.status(201).json({ message: 'Rating submitted successfully' });
        }
    } catch (error) {
        console.error('Submit rating error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};