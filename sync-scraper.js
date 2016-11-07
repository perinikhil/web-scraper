const request = require('request');
const Functions = require('./functions.js');
const requestCallback = Functions.requestCallbackSync;
const checkArgs = Functions.checkArgs;

if (checkArgs()) {
  const url = 'https://medium.com';

  request(url, (err, res, html) => {
    const uniqLinks = requestCallback(err, res, html);
    console.log(uniqLinks);

    // console.time('sync');
    uniqLinks.forEach((link, index) => {
      // if (index < 5) {
        console.log('Fetching from ' + link);
        request(link, requestCallback);
      // }
    });
    // console.timeEnd('sync');
  });
}
