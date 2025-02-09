const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    679034838969-bsv0kgble4m6tmsufv9vl4glgditoaqk.apps.googleusercontent.com,
  CLIENT_SECRET, // Replace with your OAuth2 Client Secret
  REDIRECT_URI // Replace with your Redirect URI
);

// Generate a URL for user consent
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['YOUR_SCOPES'], // Replace with required scopes
});

console.log('Authorize this app by visiting this url:', authUrl);




// // server.js
// const express = require('express');
// const { google } = require('googleapis');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = 3000;

// // Set up the Google Sheets API client
// const sheets = google.sheets('v4');
// const credentials = JSON.parse(fs.readFileSync('milkrecords-3105e5db47a3.json')); // Path to your service account key file

// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// const auth = new google.auth.JWT(
//   credentials.client_email,
//   null,
//   credentials.private_key,
//   SCOPES
// );

// // Google Sheets API interaction
// app.post('/add-data', async (req, res) => {
//   const { date, session, quantity, fat, amount } = req.body; // Get data from frontend

//   const spreadsheetId = '1II47Y8ML7QkBwR-WWpGalodiWFSbBD-T0Alqx2yuGOs'; // Replace with your actual Spreadsheet ID
//   const range = 'Sheet1!A2:E2';

//   const request = {
//     spreadsheetId,
//     range,
//     valueInputOption: 'RAW',
//     resource: {
//       values: [
//         [date, session, quantity, fat, amount] // Data to insert
//       ]
//     },
//     auth
//   };

//   try {
//     const response = await sheets.spreadsheets.values.update(request);
//     res.status(200).send('Data added to Google Sheet');
//   } catch (error) {
//     res.status(500).send('Error adding data: ' + error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
