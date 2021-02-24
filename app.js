const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
/*
function con (name){
    debugger;
    axios.get('https://www.forextradingbig.com/instaforex-broker-review/')
       .then(response => {
    debugger;

          const html = response.data;

          //loading response data into a Cheerio instance
          const $ = cheerio.load(html);
      
          //selecting the elements with the data
          const scrapedata = $("a", ".comment-bubble").text();
      
          //outputting the scraped data
          console.log(scrapedata);
       })
}

const bob = con()
*/
puppeteer.launch({
  headless: false,
  args: ["--disable-setuid-sandbox"],
  'ignoreHTTPSErrors': true
}).then(async browser => {
  debugger;
  // opening a new page and navigating to Reddit
  const page = await browser.newPage();
  await page.goto('https://www.reddit.com/r/scraping/');
  await page.waitForSelector('body');

  // manipulating the page's content
  let grabPosts = await page.evaluate(() => {
      
      let allPosts = document.body.querySelectorAll('.Post');

      //storing the post items in an array then selecting for retrieving content

      scrapeItems = [];
      allPosts.forEach(item => {
          let postTitle = item.querySelector('h3');
          let postDescription = item.querySelector('p');

          scrapeItems.push({
              postTitle: postTitle ? postTitle.innerText : null,
              postDescription: postDescription ? postDescription.innerText : null,
          });
      });

      let items = {
          "redditPosts": scrapeItems,
      };

      return items;
  });

  // outputting the scraped data
  console.log(grabPosts);
  // closing the browser
  await browser.close();

}).catch(function (err) {
  console.error(err);
});