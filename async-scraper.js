const request = require('request');
const Functions = require('./functions.js');
const asyncEach = require('async/each');
const requestCallback = Functions.requestCallbackAsync;
const checkArgs = Functions.checkArgs;

if (checkArgs()) {
  const url = 'https://medium.com';

  // console.time('async');
  request(url, (err, res, html) => {
    requestCallback(err, res, html, (uniqLinks) => {
      // const keys = Object.keys(uniqLinks);
      // asyncEach(keys, (key, cb) => {
      //   if (key < 5) {
      //     const link = uniqLinks[key];
      //     console.log('Fetching from ' + link);
      //     request(link, (err, res, html) => {
      //       requestCallback(err, res, html, () => {});
      //     });
      //     cb();
      //   }
      // });
      asyncEach(uniqLinks, (link, cb) => {
        console.log('Fetching from ' + link);
        request(link, (err, res, html) => {
          requestCallback(err, res, html, () => {});
        });
        cb();
      });
    });
    // console.timeEnd('async');
  });
}
