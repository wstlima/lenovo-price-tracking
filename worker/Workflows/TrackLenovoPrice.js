const fs = require('fs');

const readFile = (path, opts = 'utf8') => new Promise((resolve, reject) => require('fs').readFile(path, opts, (err, data) => (err ? reject(err) : resolve(data))));
const writeFile = (path, data, opts = 'utf8') => new Promise((resolve, reject) => require('fs').writeFile(path, data, opts, (err) => (err ? reject(err) : resolve(true))));

module.exports = async function workflow (product, productUrl, alertPrice, hoursBetweenEachCheck) {
  const task = require('../Tasks/GetLenovoProductPrice')
  const runTask = await task(productUrl)
  await writeFile('data/prices.json', JSON.stringify(runTask), 'utf8');
  return runTask
}
