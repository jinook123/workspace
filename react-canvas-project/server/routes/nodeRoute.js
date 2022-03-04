/**
 * User(test) /component routing
 */
const express = require('express');
const oracledb = require('oracledb');
const oraclePool = require('../connection/oraclePool');
const nodeServices = require('../services/nodeServices');

const router = express.Router();

/**
 * ORACLE User server All tables list
 */
router.post("/tableList", (req, res) => {

	nodeServices.getTableList(result => {
		res.status(200).send(result);
	}).catch(err => {
		res.status(500).send({
			success: false,
			message: err,
		})
	})
})

/**
 * ORACLE User server All tables and columns
 */
router.post("/colList", (req, res) => {

	nodeServices.getAllTabCol(result => {
		res.status(200).send(result);
	}).catch(err => {
		res.status(500).send({
			success: false,
			message: err,
		})
	})
})

module.exports = router;
