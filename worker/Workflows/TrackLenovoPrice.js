const fs = require('fs');

const readFile = (path, opts = 'utf8') => new Promise((resolve, reject) => require('fs').readFile(path, opts, (err, data) => (err ? reject(err) : resolve(data))));
const writeFile = (path, data, opts = 'utf8') => new Promise((resolve, reject) => require('fs').writeFile(path, data, opts, (err) => (err ? reject(err) : resolve(true))));

function compare( a, b ) {
  if ( parseFloat(a.price) < parseFloat(b.price) ){
    return -1;
  }
  if ( parseFloat(a.price) > parseFloat(b.price) ){
    return 1;
  }
  return 0;
}

module.exports = async function workflow (product, productUrl, alertPrice, hoursBetweenEachCheck) {
  const task = require('../Tasks/GetLenovoProductPrice')
  const runTask = await task(productUrl)
  const list = runTask.sort( compare );
  await writeFile('data/prices.json', JSON.stringify(list), 'utf8');
  return runTask
}
