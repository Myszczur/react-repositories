const express = require('express');

const router = express.Router();

router.get('/api/hello', (req, res) => {
    res.json('Hello world!');
});

module.exports = router;