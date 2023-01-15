'use strict'
const  run  = require('../worker/client');
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var config = require('./config')
const PORT = process.env.PORT || config.port

app.use(bodyParser.json())
app.use(express.static(__dirname))
app.listen(PORT)

console.log('App listening on http://localhost:' + PORT)

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname })
})

app.post('/api/alert', async function (req, res) {
  const { name, url, price, delay } = req.body;
  const options = { tag: `${name} (${price})`, workflow: 'TrackLenovoPrice', product: name, productUrl: url, alertPrice: price, hoursBetweenEachCheck: delay };
  const runWorker = await run(options);
  res.json(JSON.stringify(runWorker))
})
