# web-scraper
A simple web scraper right now that mildly scrapes https://medium.com

The scraper makes an inital request to medium.com and then scrapes through the first 5 links from the response HTML.
This is to prevent overloading of the Medium servers and getting my IP banned!
The scraper outputs a .csv file and the filename should be passed as a command line argument.

Installing
1 - Clone this repo to your local machine.
2 - npm install
3 - to run the async version that uses async.js,
    npm run start-async <output filename>
      [or]
    node async-scraper.js <output filename>
4 - to run the sync version,
    npm run start-sync <output filename>
      [or]
    node sync-scraper.js <output filename>
