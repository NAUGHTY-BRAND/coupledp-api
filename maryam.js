
console.log(`\n
███╗   ███╗ █████╗ ██████╗ ██╗   ██╗ █████╗ ███╗   ███╗
████╗ ████║██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗████╗ ████║
██╔████╔██║███████║██████╔╝ ╚████╔╝ ███████║██╔████╔██║
██║╚██╔╝██║██╔══██║██╔══██╗  ╚██╔╝  ██╔══██║██║╚██╔╝██║
██║ ╚═╝ ██║██║  ██║██║  ██║   ██║   ██║  ██║██║ ╚═╝ ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝

`);
const express = require('express');
const { downloadMedia } = require('yt-downloadify');
const path = require('path')
const fs = require('fs');
const maryam = require('lodash');
const data = require('./dps.json');
const axios = require('axios');
const app = express();
let shuffledData = maryam.shuffle(data);
const sentUrls = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/coupledp', async (req, res) => {
  let apiKeys = "Maryam"
  let apiKey = req.query.apiKey
  if (!apiKey) {
    return res.status(400).send('apiKey Parameter Is Required!');
  }
 if (apiKey !== apiKeys) {
  return res.status(400).send("Api Key Is Not Correct");
}
  let matchingUrls;
  while (!matchingUrls || sentUrls.includes(matchingUrls.Boy) || sentUrls.includes(matchingUrls.Girl)) {
    if (sentUrls.length === shuffledData.length) {
      shuffledData = maryam.shuffle(data);
      sentUrls.length = 0;
    }
    const randomIndex = Math.floor(Math.random() * shuffledData.length);
    matchingUrls = shuffledData[randomIndex];
  }

  sentUrls.push(matchingUrls.Boy, matchingUrls.Girl);

  console.log('Req Recived For Couple DP');
  res.json(matchingUrls);
});
app.get('/addcoupledp', async (req, res) => {
  const Boy = req.query.Boy;
  const Girl = req.query.Girl;

  let apiKeys = "VipMaryamApiKey"
  let apiKey = req.query.apiKey
  if (!apiKey) {
    return res.status(400).send('apiKey Parameter Is Required!');
  }
 if (apiKey !== apiKeys) {
  return res.status(400).send("Api Key Is Not Correct");
}
  if (!Boy || !Girl) {
    return res.status(400).send('Both Boy and Girl parameters are required');
  }


  data.push({ Boy, Girl });
  shuffledData = maryam.shuffle(data);

  fs.writeFile('dps.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing to data file');
    }

    console.log('GET request received for add-matching-images');
    res.send('Matching images added successfully');
  });
});
app.get('/gpt4', async (req, res) => {
  let p = req.query.q;
  let userid = req.query.uid;
  if (!p || !userid) {
    return res.status(400).send('Question And Uid Are Required');
  }
    let rss = await axios.get(`https://hercai.onrender.com/beta/hercai?question=${p}&user=${userid}`);
    let maryam_ai_data = rss.data.reply;
 res.json({ maryam: maryam_ai_data })
});
app.get('/ytdl', async (req, res) => {
  try {
let name = req.query.name;
let type = req.query.type;
    if (!name || !type) {
    return res.status(400).send('Name And Type Parameter Is Required');
  }
    console.log(name);
    console.log(type);
let result = await downloadMedia({ name, type, apikey: 'maryam-youtube-api' });
    let finalresults = `${result}`
    res.json({
        maryam: {
            Creator: finalresults.creator,
            creator_contact: finalresults.creator_contact,
            type: finalresults.type,
  title: finalresults.title,
  description: finalresults.description,
  duration: finalresults.duration,
  views: finalresults.views,
  authorName: finalresults.authorName,
  uploadDate: finalresults.uploadDate,
  downloadUrl: finalresults.downloadUrl,
  shortUrl: finalresults.shortUrl
        }
    });
    } catch (error) {
        return res.status(502).send(`An Error Occured ${error}`);
    }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
  console.log(`
=================================================

Api                    Is                   Now

 ██████╗ ███╗   ██╗██╗     ██╗███╗   ██╗███████╗
██╔═══██╗████╗  ██║██║     ██║████╗  ██║██╔════╝
██║   ██║██╔██╗ ██║██║     ██║██╔██╗ ██║█████╗  
██║   ██║██║╚██╗██║██║     ██║██║╚██╗██║██╔══╝  
╚██████╔╝██║ ╚████║███████╗██║██║ ╚████║███████╗
 ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝

=================================================
 `);
});
