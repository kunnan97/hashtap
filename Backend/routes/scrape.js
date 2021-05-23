const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");

// Routes
router.get("/get-user/:username", async(req, res) => {
	try {
        const username = req.params.username;
        scrape(username);
	} catch (err) {
		console.error(err.message);
	}

    // Function to scrape TikTok information given username.
    function scrape(username) {
        const url = 'https://www.tiktok.com/@' + username + '?lang=en';
        const puppeteer = require('puppeteer');
        const cheerio = require('cheerio');

        puppeteer.launch()
            .then(function(browser) {
                return browser.newPage();
        })
            .then(function(page) {
                return page.goto(url).then(function() {
                return page.content();
            });
        })
        .then(function(html) {
            const htmlContentCheerio = cheerio.load(html);
            const userInfoHTML = htmlContentCheerio('.count-infos').html();
            
            // Handling case where no user is found.
            if (userInfoHTML == null) {
                console.log("Invalid user.");
                res.json(null);
            }
            
            // Getting relevant info.
            const userInfoCheerio = cheerio.load(userInfoHTML);
            const picLink = htmlContentCheerio('#main > div.jsx-1329660164.main-body.page-with-header.middle > div.jsx-131428299.share-layout.compact.middle > div > header > div.share-info > div.jsx-3671626146.image-wrap.big.user-page-header > span > img'
                ).attr('src');
            const description = htmlContentCheerio('#main > div.jsx-1329660164.main-body.page-with-header.middle > div.jsx-131428299.share-layout.compact.middle > div > header > h2.share-desc.mt10'
                ).text();
            const following = userInfoCheerio('strong[title=Following]').text();
            const followers = userInfoCheerio('strong[title=Followers]').text();
            const likes = userInfoCheerio('strong[title=Likes]').text();
            
            // Returning values as a json.
            const userInfoJSON = {
                pic: picLink,
                description: description,
                following: following,
                followers: followers,
                likes: likes,
            }
            res.json(userInfoJSON);
        })
        .catch(function(err) {
            console.log(err);
            res.json(null);
        });

    }
});
module.exports = router;