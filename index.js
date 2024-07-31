const express = require('express');
const fs = require('fs');
const _ = require('lodash'); // Import Lodash library for array shuffling
const data = require('./data.json'); // Assuming the data is stored in data.json file

const app = express();
let shuffledData = _.shuffle(data); // Shuffle the data array initially
const sentUrls = []; // List to keep track of previously sent image URLs

app.use(express.json()); // Middleware to parse incoming JSON request bodies

// Endpoint to get a random matching male and female image URLs
app.get('/coupledp', async (req, res) => {
  let matchingUrls;
  while (!matchingUrls || sentUrls.includes(matchingUrls.maleUrl) || sentUrls.includes(matchingUrls.femaleUrl)) {
    // Shuffle the data array again if all images have been sent
    if (sentUrls.length === shuffledData.length) {
      shuffledData = _.shuffle(data);
      sentUrls.length = 0;
    }
    const randomIndex = Math.floor(Math.random() * shuffledData.length);
    matchingUrls = shuffledData[randomIndex];
  }
  
  sentUrls.push(matchingUrls.maleUrl, matchingUrls.femaleUrl);
  
  console.log('GET request received for matching-images');
  res.json(matchingUrls);
});

// Endpoint to add a new matching male and female image URLs to the data
app.get('/addcoupledp', async (req, res) => {
  const maleUrl = req.query.maleUrl;
  const femaleUrl = req.query.femaleUrl;

  if (!maleUrl || !femaleUrl) {
    return res.status(400).send('Both maleUrl and femaleUrl parameters are required');
  }

  data.push({ maleUrl, femaleUrl });
  shuffledData = _.shuffle(data); // Shuffle the data array whenever new images are added

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing to data file');
    }

    console.log('GET request received for add-matching-images');
    res.send('Matching images added successfully');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
