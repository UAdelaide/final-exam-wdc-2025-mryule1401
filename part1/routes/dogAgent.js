var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async function(req, res) {
const [rows] = await db.query(`
    SELECT bl.BookID, b.Title, b.Author, u.Name AS SellerName, bl.SellerID
    FROM BookListings bl
    JOIN BookInfo b ON bl.BookInfoID = b.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
`);
res.json(rows);
});