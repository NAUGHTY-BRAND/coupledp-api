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
const lodash = require('lodash');
const data = require('./dps.json');

const app = express();
let shuffledData = lodash.shuffle(data);
const sentUrls = [];

app.use(express.json());

function chkapiKeys(callback) {
  fs.readFile('apiKeys.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading apiKeys.json:', err);
      return;
    }
    const jsonData = JSON.parse(data);
    callback(jsonData.apiKeys);
  });
}

app.get('/coupledp', async (req, res) => {
  chkapiKeys((apiKeys) => {
    if (apiKeys.includes(req.query.apiKey)) {  // Assuming you want to check API key here
      let matchingUrls;
      while (!matchingUrls || sentUrls.includes(matchingUrls.Boy) || sentUrls.includes(matchingUrls.Girl)) {
        if (sentUrls.length === shuffledData.length) {
          shuffledData = lodash.shuffle(data);
          sentUrls.length = 0;
        }
        const randomIndex = Math.floor(Math.random() * shuffledData.length);
        matchingUrls = shuffledData[randomIndex];
      }

      sentUrls.push(matchingUrls.Boy, matchingUrls.Girl);

      console.log('Req Recived For Couple DP');
      res.json(matchingUrls);
    } else {
      return res.status(400).send('Your Api Key Is Incorrect.');
    }
  });
});

app.get('/addcoupledp', async (req, res) => {
  const Boy = req.query.Boy;
  const Girl = req.query.Girl;
  const apiKey = req.query.apiKey;
  
  if (!Boy || !Girl) {
    return res.status(400).send('Both Boy and Girl parameters are required');
  }
  
  if (apiKey !== "FARISXD5251515050") {
    return res.status(400).send("Api Key Is Not Correct");
  }
  
  data.push({ Boy, Girl });
  shuffledData = lodash.shuffle(data);

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
