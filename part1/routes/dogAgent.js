var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async function(req, res) {
const [rows] = await db.query(`
    SELECT d.name,
    FROM Dogs d
    JOIN BookInfo b ON bl.BookInfoID = b.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
`);
res.json(rows);
});