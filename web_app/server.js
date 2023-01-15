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

app.get('/api/prices', function (req, res) {
  res.sendFile('data/prices.json', { root: __dirname })
})

app.post('/api/alert', async function (req, res) {
  const { name, url, price, delay } = req.body;
  const options = { tag: `${name} (${price})`, workflow: 'TrackLenovoPrice', product: name, productUrl: url, alertPrice: price, hoursBetweenEachCheck: delay };
  const runWorker = await run(options);
  res.json(JSON.stringify(runWorker))
})
app.get('/api/clear', async function (req, res) {
  const writeFile = (path, data, opts = 'utf8') => new Promise((resolve, reject) => require('fs').writeFile(path, data, opts, (err) => (err ? reject(err) : resolve(true))));
  await writeFile('data/prices.json', '{}', 'utf8');
  res.json('{}')
})
