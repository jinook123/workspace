/**
 * User(test) /component routing
 */
const express = require('express');

const router = express.Router();
const nodeServices = require('../services/nodeServices');

/**
 * get table list
 * @param DB (oracle, mysql)
 * @param NAME (database name)
 */
router.post('/tableList', (req, res) => {

	const {db} = req.body;

	if (db.toUpperCase() === 'ORACLE') {

		nodeServices.getOracleTableList(req.body, result => {
			res.status(200).send(result);
		}).catch(err => {
			res.status(500).send({
				success: false,
				message: err,
			})
		})
	} else {

		nodeServices.getMyTableList(req.body, result => {
			res.status(200).send(result);
		}).catch(err => {
			res.status(500).send({
				success: false,
				message: err,
			})
		})
	}
})

/**
 * ORACLE User server All tables and columns
 */
router.post("/colList", (req, res) => {

	const {dbName} = req.body;
	const {tableName} = req.body;

	if (dbName.toUpperCase() === 'ORACLE') {

		nodeServices.getOracleColList(tableName, result => {
			res.status(200).send(result);
		}).catch(err => {
			res.status(500).send({
				success: false,
				message: err,
			})
		})
	} else {

		nodeServices.getMyColList(req, result => {
			res.status(200).send(result);
		}).catch(err => {
			res.status(500).send({
				success: false,
				message: err,
			})
		})
	}
})

router.post('/result', (req, res) => {

	const {dbName} = req.body;
	const {tableName} = req.body;
	const {colName} = req.body;


})

module.exports = router;
