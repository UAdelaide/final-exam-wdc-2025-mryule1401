var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async function (req, res) {
    const [rows] = await db.query(`
        SELECT d.name, d.size, u.username
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
    `);
    res.json(rows);
});

router.get('/walkrequests/open', async function (req, res) {
    const [rows] = await db.query(`
        SELECT r.request_id, d.name AS dog_name, r.requested_time, r.duration_minutes, r.location, u.username
        FROM WalkRequests r
        JOIN Dogs d ON r.dog_id = d.dog_id
        JOIN Users u ON d.owner_id = u.user_id
        WHERE r.status ='open'
    `);
    res.json(rows);
});


router.get('/walkers/summary', async function (req, res) {
    const [rows] = await db.query(`
            SELECT
                u.username AS walker_username,
                COUNT(wrat.rating) AS total_ratings,
                AVG(wrat.rating) AS average_rating,
                (COUNT(DISTINCT wr.request_id) AS completed_walks
            FROM Users u
            LEFT JOIN WalkApplications wa ON u.user_id = wa.walker_id AND wa.status = 'accepted'
            LEFT JOIN WalkRequests wr ON wa.request_id = wr.request_id AND wr.status = 'completed'
            LEFT JOIN WalkRatings wrat ON wr.request_id = wrat.request_id
            WHERE u.role = 'walker'
            GROUP BY u.username
    `);
    res.json(rows);
});


module.exports = router;