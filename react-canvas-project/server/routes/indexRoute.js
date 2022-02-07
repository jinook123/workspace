/**
 * 기본 routing (임시)
 */
const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
	res.json({ db: 'connected' });
});

module.exports = router;
