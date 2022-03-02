const express = require('express');
const cors = require('cors');
const indexRoute = require('./routes/indexRoute');
const apiRoute = require('./routes/apiRoute');
const nodeRoute = require('./routes/nodeRoute');

const app = express();
const PORT = 3001;

// CORS 설정, 배포 시 변경 필요
const corsOptions = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};

app.use(cors(corsOptions));
app.use(express.json());

// 기본 router (임시)
app.use('/', indexRoute);
// admin(server) router
app.use('/api', apiRoute);
// user(component 등등) router
app.use('/node', nodeRoute);

// 서버 실행
app.listen(PORT, () => {
	console.log(`Connected : ${PORT}`);
});

// 404 처리
app.use((req, res) => {
	res.status(404).json('404 not found');
});

// app.use(function(req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Allow-Origin", "http://localhost:4000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });
