const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
	res.json({ db: 'connected' });
});

module.exports = router;
