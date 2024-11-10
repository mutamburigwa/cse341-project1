const express = require('express');  // Ensure express is required
const router = express.Router();

router.get('/', (req, res) => { 
    res.send('Hello world');  // Use parentheses here
});

router.use('/users', require('./users'));

module.exports = router;
