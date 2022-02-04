const express = require('express');
const service = require('../services/serverService');

const router = express.Router();

// 전체 db list
router.post('/DBList', (req, res) => {
	service.getDBList(result => {
		res.json(result);
	});
});

// db 단일 조회
router.post('/selectOne', (req, res) => {
	service.selectOne(req, result => {
		res.json(result);
	});
});

// db 정보 추가
router.post('/addDB', (req, res) => {
	service.addDb(req, result => {
		res.json(result);
	});
});

// db 정보 제거
router.post('/delDB', (req, res) => {
	service.delDb(req, result => {
		res.json(result);
	});
});

// db 정보 수정
router.post('/modDB', (req, res) => {
	service.modDb(req, result => {
		res.json(result);
	});
});

// table list 호
router.post('/readTb', (req, res) => {
	service.readTb(req.body, result => {
		res.json(result);
	});
});

// json 저장
router.post('/jsonSave', (req, res) => {
	service.jsonSave(req.body, result => {
		res.json(result);
	});
});

// json 로드
router.post('/jsonLoad', (req, res) => {
	service.jsonLoad(req.body, result => {
		res.json(result);
	});
});

module.exports = router;
