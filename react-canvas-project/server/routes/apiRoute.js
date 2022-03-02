/**
 * Admin(Server) /api routing
 * 정상실행 : code 200, result json
 * 에러 : code 500, error message
 */
const express = require('express');
const DBService = require('../services/DBServices');
const jsonService = require('../services/jsonServices');

const router = express.Router();

/**
 * 전체 DB 목록 조회
 * @returns All DB List
 */
router.post('/DBList', (req, res) => {

	DBService.getDBList(result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});

/**
 * 선택한 DB 정보 조회
 * @param req selected DB num
 * @returns status code, DB info
 */
router.post('/selectOne', (req, res) => {

	DBService.getDBByNum(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});

// db 정보 추가
router.post('/addDB', (req, res) => {

	DBService.insertDBInfo(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});

// db 정보 제거
router.post('/delDB', (req, res) => {

	DBService.delDB(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});

// db 정보 수정
router.post('/modDB', (req, res) => {

	DBService.modDb(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});


/**
 * DB 접속 테스트
 */
router.post('/connTest', (req, res) => {

	DBService.mysqlConnTest(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});


// // table list
// router.post('/readTb', (req, res) => {
// 	try {
// 		DBService.readTb(req.body, result => {
// 			res.status(200).send(result);
// 		});
// 	} catch (err) {
// 		res.status(500).send({
// 			success: false,
// 			message: err
// 		})
// 	}
// });

/**
 * 전체 json list
 */
router.post('/jsonList', (req, res) => {

	jsonService.getJsonList(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});

// json 저장
router.post('/jsonSave', (req, res) => {

	jsonService.saveUserJson(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});

// json 로드
router.post('/jsonLoad', (req, res) => {

	jsonService.getUserJson(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});

/**
 * w/f update
 */
router.post('/jsonUpdate', (req, res) => {

	jsonService.updateUserJson(req.body, result => {

		res.status(200).send(result);

	}).catch(err => {

		res.status(500).send({
			success: false,
			message: err,
		})
	});
});



module.exports = router;
