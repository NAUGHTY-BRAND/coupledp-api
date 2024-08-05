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

// Check if the predefined user greeting exists in the greetings list
chkapiKeys((apiKeys) => {
 let apiKeys = "FarisAliXD"
 let apiKey = req.query.apiKey
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
        })
              });
app.get('/addcoupledp', async (req, res) => {
  const Boy = req.query.Boy;
  const Girl = req.query.Girl;
  let apiKeys = "FARISXD5251515050"
  let apiKey = req.query.apiKey
  if (!Boy || !Girl) {
    return res.status(400).send('Both Boy and Girl parameters are required');
  }
if (apiKey !== apiKeys) {
  return res.status(400).send("Api Key Is Not Correct");
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
