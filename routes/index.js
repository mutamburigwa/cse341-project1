const express = require('express');  // Ensure express is required
const router = express.Router();

router.use('/', require('./swagger'))

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']
    res.send('Hello world');  // Use parentheses here
});

router.use('/users', require('./users'));

module.exports = router;
