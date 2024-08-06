console.log(`\n
███╗   ███╗ █████╗ ██████╗ ██╗   ██╗ █████╗ ███╗   ███╗
████╗ ████║██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗████╗ ████║
██╔████╔██║███████║██████╔╝ ╚████╔╝ ███████║██╔████╔██║
██║╚██╔╝██║██╔══██║██╔══██╗  ╚██╔╝  ██╔══██║██║╚██╔╝██║
██║ ╚═╝ ██║██║  ██║██║  ██║   ██║   ██║  ██║██║ ╚═╝ ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝

`);
const express = require('express');
const fs = require('fs');
const maryam = require('lodash');
const data = require('./dps.json');

const app = express();
let shuffledData = maryam.shuffle(data);
const sentUrls = [];

app.use(express.json());
app.get('/coupledp', async (req, res) => {
  let apiKeys = "FarisAliXD"
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

  let apiKeys = "VipFarisAliXD5251515050"
  let apiKey = req.query.apiKey\
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

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing to data file');
    }

    console.log('GET request received for add-matching-images');
    res.send('Matching images added successfully');
  });
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
