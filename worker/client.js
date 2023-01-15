const workflow = require('../worker/Workflows/TrackLenovoPrice')

async function runJobLenovoWorkFlow(options) {
  const { product, productUrl, alertPrice, hoursBetweenEachCheck } = options;
  const respWork = await workflow(product, productUrl, alertPrice, hoursBetweenEachCheck)
  return respWork
}

module.exports = async function run(options) {
  return await runJobLenovoWorkFlow(options);
}
