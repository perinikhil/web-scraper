const cheerio = require('cheerio');
const asyncMap = require('async/map');
const asyncFilter = require('async/filter');
const fs = require('fs');

function checkArgs () {
  if (process.argv.length !== 3) {
    console.log('Usage:\nnode (a)sync-scraper.js <output filename>');
    return false;
  }
  return true;
}

function getLinksFromHtml (html) {
  const links = [];
  const $ = cheerio.load(html);

  $('a').map((index, anchorTag) => {
    let href = $(anchorTag).attr('href');
    if (href) {
      href = href.split('?')[0];
      links.push(href);
    }
  });

  return links;
}

function getUniqueLinksAsync (links, callback) {
  const keys = Object.keys(links);
  asyncFilter(keys, (key, cb) => {
    const link = links[key];
    cb(null, links.indexOf(link) === parseInt(key));
  }, (err, uniqKeys) => {
    if (!err) {
      asyncMap(uniqKeys, (key, cb) => {
        cb(null, links[key]);
      }, (err, results) => {
        if (!err) {
          callback(results);
        }
      });
    } else {
      console.log('err');
      callback();
    }
  });
}

function getUniqueLinksSync (links) {
  const uniqLinks = links.filter((link, index) => {
    return links.indexOf(link) === index;
  });

  return uniqLinks;
}

function writeFileCallback () {
  console.log('done');
}

function writeToFile (fileName, data) {
  fs.appendFile(fileName, data, writeFileCallback);
}

function requestCallbackAsync (err, res, html, cb) {
  if (!err) {
    const links = getLinksFromHtml(html);
    getUniqueLinksAsync(links, (uniqLinks) => {
      writeToFile(process.argv[2], uniqLinks.join(',\n'));

      cb(uniqLinks);
    });
  }
  return [];
}

function requestCallbackSync (err, res, html) {
  if (!err) {
    const links = getLinksFromHtml(html);
    const uniqLinks = getUniqueLinksSync(links);

    writeToFile(process.argv[2], uniqLinks.join(',\n'));
  }
  return [];
}

// function recursiveCallback (err, res, html, count) {
//   if (count < 3) {
//     if (!err) {
//       const uniqLinks = requestCallback(err, res, html);

//       uniqLinks.forEach((link) => {
//         setTimeout(() => {
//           request(link, (err, res, html) => {
//             recursiveCallback(err, res, html, count + 1);
//           });
//         }, 100);
//       });
//     }
//   } else {
//     requestCallback(err, res, html);
//   }
// }

module.exports = {
  requestCallbackAsync: requestCallbackAsync,
  requestCallbackSync: requestCallbackSync,
  checkArgs: checkArgs
};
