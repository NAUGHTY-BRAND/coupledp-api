const express = require('express');
const fs = require('fs');
const maryam = require('lodash');
const data = require('./dps.json');

const app = express();
let shuffledData = maryam.shuffle(data);
const sentUrls = [];

app.use(express.json());
app.get('/coupledp', async (req, res) => {
  let matchingUrls;
  while (!matchingUrls || sentUrls.includes(matchingUrls.maleUrl) || sentUrls.includes(matchingUrls.femaleUrl)) {
    if (sentUrls.length === shuffledData.length) {
      shuffledData = maryam.shuffle(data);
      sentUrls.length = 0;
    }
    const randomIndex = Math.floor(Math.random() * shuffledData.length);
    matchingUrls = shuffledData[randomIndex];
  }
  
  sentUrls.push(matchingUrls.maleUrl, matchingUrls.femaleUrl);
  
  console.log('Req Recived For Couple DP');
  res.json(matchingUrls);
});
app.get('/addcoupledp', async (req, res) => {
  const maleUrl = req.query.maleUrl;
  const femaleUrl = req.query.femaleUrl;

  if (!maleUrl || !femaleUrl) {
    return res.status(400).send('Both maleUrl and femaleUrl parameters are required');
  }

  data.push({ maleUrl, femaleUrl });
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
  console.log('Server is running on port 3000');
});
