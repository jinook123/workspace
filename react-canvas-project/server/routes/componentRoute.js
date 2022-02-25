/**
 * User(test) /component routing
 */
const express = require('express');
const oracledb = require('oracledb');
const oraclePool = require('../connection/oraclePool');

const router = express.Router();

router.post("/test", (req, res) => {
	const sql = `select * from component_test_ora`

	oracledb.getConnection('react', (DBErr, conn) => {
		console.log('conn');
		if (DBErr) throw DBErr;
		conn.execute(sql, (err, result) => {
			console.log(result);
			res.send(result);
		})
	})
});

module.exports = router;
