var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async function(req, res) {
    const [rows] = await db.query(`
    SELECT d.name, d.size, u.username
    FROM Dogs d
    JOIN Users u d.dog_id = u.user_id
`);
res.json(rows);
});

module.exports =router;