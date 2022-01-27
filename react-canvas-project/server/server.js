const express = require('express');
const cors = require('cors');
const indexRoute = require('./routes/indexRoute');
const apiRoute = require('./routes/apiRoute');

const app = express();
const PORT = 3001;

const corsOptions = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};

app.use(cors(corsOptions));
app.use(express.json());

// app.use(cors(corsOptions));

// const bodyParser = require('body-parser');
// const { router } = require('express/lib/application');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
// 	res.json(`it works!`);
// });

app.use('/', indexRoute);

app.use('/api', apiRoute);

// app.post('/DBConnect', (req, res) => {
// 	const text = req.body;
// 	console.log(text);
// 	const sendText = {
// 		db: 'localhost',
// 	};
// 	res.json(sendText);
// });

app.listen(PORT, () => {
	console.log(`Connected : ${PORT}`);
});

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
