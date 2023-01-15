'use strict'

module.exports = workflow('TrackLenovoPrice', function * (product, productUrl, alertPrice, hoursBetweenEachCheck) {
  while (true) {
    // get product price
    const price = yield require('../Tasks/GetLenovoProductPrice').task('GetLenovoProductPrice', productUrl)

    if (!price) {
      // Todo: can not find price log

      // body: {
      //   text: `❌ Can not find price of ${product} \n ➡️ ${productUrl}`,
      // }

      // terminate workflow
      this.terminate()
    }

    // Todo: save alert if needed
    if (parseFloat(price) < alertPrice) {
      // body: {
      //   text: `🚨 ${product} goes below ${alertPrice}€ \n 💰 Current price: ${price} \n ➡️ ${productUrl}`,
      // }
      // terminate workflow
      this.terminate()
    }

    // wait 4 hours before next check
    // yield this.wait.for(duration.hours(hoursBetweenEachCheck))
  }
})
