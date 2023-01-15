// load .env file
// const fs = require('fs')
// const dotenv = require('dotenv')
// const dotenvfile = __dirname + '/.env'
const  workflow  = require('../worker/Workflows/TrackLenovoPrice')
// if (fs.existsSync(dotenvfile)) {
//   dotenv.config({ path: dotenvfile })
// }

async function runJobLenovoWorkFlow(options){
  const { product, productUrl, alertPrice, hoursBetweenEachCheck } = options;
  
  const respWork = await  workflow( product, productUrl, alertPrice, hoursBetweenEachCheck)
  return respWork
}



module.exports = async function run(options) {
    return await runJobLenovoWorkFlow(options);
}
