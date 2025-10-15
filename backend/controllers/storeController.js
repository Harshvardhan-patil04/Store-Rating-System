const db = require('../config/db');

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        const [stores] = await db.query(
            'SELECT id FROM stores WHERE user_id = ?',
            [userId]
        );

        if (stores.length === 0) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const storeId = stores[0].id;

        const [avgRating] = await db.query(
            'SELECT COALESCE(AVG(rating), 0) as averageRating FROM ratings WHERE store_id = ?',
            [storeId]
        );

        const [ratings] = await db.query(
            `SELECT 
                u.id,
                u.name,
                u.email,
                r.rating,
                r.created_at
             FROM ratings r
             JOIN users u ON r.user_id = u.id
             WHERE r.store_id = ?
             ORDER BY r.created_at DESC`,
            [storeId]
        );

        res.json({
            averageRating: avgRating[0].averageRating,
            ratings
        });
    } catch (error) {
        console.error('Store dashboard error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};