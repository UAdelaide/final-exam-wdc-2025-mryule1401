var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async function (req, res) {
    const [rows] = await db.query(`
        SELECT d.name, d.size, u.username
        FROM Dogs d
        JOIN Users u ON d.dog_id = u.user_id
    `);
    res.json(rows);
});

router.get('/walkrequest/open', async function (req, res) {
    const [rows] = await db.query(`
        SELECT r.request_id, d.name, r.requested_time, r.duration_minutes. r.location, u.username
        FROM WalkRequests r
        JOIN Users u ON d.dog_id = u.user_id
    `);
    res.json(rows);
});

module.exports = router;