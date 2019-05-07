const express = require('express')
const app = express()
const port = process.env.PORT || 3030;
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const compression = require('compression')
require('dotenv').config()


app.use(compression())
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
