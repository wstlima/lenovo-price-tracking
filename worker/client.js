// load .env file
const fs = require('fs')
const dotenv = require('dotenv')
const dotenvfile = __dirname + '/.env'

if (fs.existsSync(dotenvfile)) {
  dotenv.config({ path: dotenvfile })
}

function runJobLenovoWorkFlow(product, productUrl, alertPrice, hoursBetweenEachCheck){
  return require('../worker/Workflows/TrackLenovoPrice').workflow('TrackLenovoPrice', product, productUrl, alertPrice, hoursBetweenEachCheck)
}

module.exports = function run(options) {
  const { tag, workflow, product, productUrl, alertPrice, hoursBetweenEachCheck } = options;
  if(options.workflow==='TrackLenovoPrice'){
    return runJobLenovoWorkFlow(product, productUrl, alertPrice, hoursBetweenEachCheck);
  }  
  return true
}
