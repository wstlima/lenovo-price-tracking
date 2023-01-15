const run = require('./client').run
const product = 'Lenovo V110-15ISK'
const productUrl = 'https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops'
const alertPrice = 1100
const hoursBetweenEachCheck = 4
const options = { tag: `${product} (${alertPrice})`, workflow: 'TrackLenovoPrice', product, productUrl, alertPrice, hoursBetweenEachCheck };
// run workflow
run(options)





