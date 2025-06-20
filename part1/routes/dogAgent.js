var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async function(req, res) {
const [rows] = await db.query(`
    SELECT d.name, d.size, u.username
    FROM Dogs d
    JOIN Users u d. = b.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
`);
res.json(rows);
});