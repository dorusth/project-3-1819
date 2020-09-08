const express = require('express')
const app = express()
const port = process.env.PORT || 3030;
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const compression = require('compression')
const request = require('request')
const jquery = require('jquery')
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('dotenv').config()

let data = {
	runs:0,
	logs:0
}

myVar = setInterval(requestData, 5000);

app.use(compression())
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

io.on('connection', function(socket){
  console.log('an user connected');
});

app.get('/', (req, res) => {
	res.render('logs')
})

app.get('/logs', (req, res) => {
	res.render('logs')
})

app.get('/logs/create', (req, res) => {
	res.render('createLog')
})

app.get('/runs', (req, res) => {
	res.render('runs')
})

app.get('/subsystems', (req, res) => {
	res.render('subsystem')
})

app.get('*', (req, res) => {
	res.render('logs')
})

http.listen(port, function(){
  console.log('listening on *:3030');
});


// fake api functionality
function requestData(){
	data.runs += Math.floor(Math.random() * 10);
	data.logs += Math.floor(Math.random() * 10);
	io.emit("check", data)
}

//	Code for when the api was still live
// async function requestData(){
// 	function logs(){
// 		function callback(error, response, body) {
// 			if (error) {
// 				console.log(response.statusCode);
// 			}else{
// 				let logs = JSON.parse(body)
// 				data.logs = logs.data.count
// 			}
// 		}
// 		request({
// 			url: "http://cmd.jiskefet.io/api/logs?orderBy=logId&orderDirection=DESC",
// 			headers: {
// 				'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ4Yzc2ZDA5LThhMjQtNGY4NS05MWUxLTRkNmIxMjZmZWNlYyIsImlzX3N1YnN5c3RlbSI6InRydWUiLCJwZXJtaXNzaW9uX2lkIjoiNyIsImlhdCI6MTU1NzM5MjE2MywiZXhwIjoxNTg4OTI4MTYzfQ.BYl1Wv6Wye5QRpHTfyVUuNZI-2BbOIPTLprCGHF52m4'
// 			}
// 		}, callback);
// 	}
// 	function runs(){
// 		function callback(error, response, body) {
// 			if (error) {
// 				console.log(response.statusCode);
// 			}else{
// 				let logs = JSON.parse(body)
// 				data.runs = logs.data.count
// 				io.emit("check", data)
// 			}
// 		}
// 		request({
// 			url: "http://cmd.jiskefet.io/api/runs?orderBy=runNumber&orderDirection=DESC",
// 			headers: {
// 				'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ4Yzc2ZDA5LThhMjQtNGY4NS05MWUxLTRkNmIxMjZmZWNlYyIsImlzX3N1YnN5c3RlbSI6InRydWUiLCJwZXJtaXNzaW9uX2lkIjoiNyIsImlhdCI6MTU1NzM5MjE2MywiZXhwIjoxNTg4OTI4MTYzfQ.BYl1Wv6Wye5QRpHTfyVUuNZI-2BbOIPTLprCGHF52m4'
// 			}
// 		}, callback);
// 	}
// 	await logs();
// 	await runs();
// }
