/**
 * Admin(Server) /api routing
 * 정상실행 : code 200, result json
 * 에러 : code 500, error message
 */

 const express = require('express');
 const service = require('../services/serverService');
 
 const router = express.Router();
 
 // 전체 db list
 router.post('/DBList', (req, res) => {
	 try {
		 service.getDBList(result => {
			 res.status(200).send(result);
		 });
	 } catch (err) {
		 res.status(500).send({
			 success: false,
			 message: err
		 })
	 }
 });
 
 // db 조회
 router.post('/selectOne', (req, res) => {
	 try {
		 service.selectOne(req.body, result => {
			 res.status(200).send(result);
		 });
	 } catch (err) {
		 res.status(500).send({
			 success: false,
			 message: err
		 })
	 }
 });
 
 // db 정보 추가
 router.post('/addDB', (req, res) => {
	 try {
		 service.addDb(req.body, result => {
			 res.status(200).send(result);
		 });
	 } catch (err) {
		 res.status(500).send({
			 success: false,
			 message: err
		 })
	 }
 });
 
 // db 정보 제거
 router.post('/delDB', (req, res) => {
	 try {
		 service.delDb(req.body, result => {
			 res.status(200).send(result);
		 });
	 } catch (err) {
		 res.status(500).send({
			 success: false,
			 message: err
		 })
	 }
 });
 
 // db 정보 수정
 router.post('/modDB', (req, res) => {
	 try {
		 service.modDb(req.body, result => {
			 res.status(200).send(result);
		 });
	 } catch (err) {
		 res.status(500).send({
			 success: false,
			 message: err
		 })
	 }
 });
 
 // table list
 router.post('/readTb', (req, res) => {
	 try {
		 service.readTb(req.body, result => {
			 res.status(200).send(result);
		 });
	 } catch (err) {
		 res.status(500).send({
			 success: false,
			 message: err
		 })
	 }
 });
 
 // json 저장
 router.post('/jsonSave', (req, res) => {
	 try {
		 service.jsonSave(req.body, result => {
			 res.status(200).send(result);
		 });
	 } catch (err) {
		 res.status(500).send({
			 success: false,
			 message: err
		 })
	 }
 });
 
 // json 로드
 router.post('/jsonLoad', (req, res) => {
	 try {
		 service.jsonLoad(req.body, result => {
			 res.status(200).send(result);
		 });
	 } catch (err) {
		 res.status(500).send({
			 success: false,
			 message: err
		 })
	 }
 });
 
 /**
  * DB 접속 테스트
  */
 router.post('/connTest', (req, res) => {
 
 });
 
 module.exports = router;