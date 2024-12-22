const express = require('express');
const app = express();

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Define a route handler for '/about'
app.get('/about', (req, res) => {
  res.send('This is the About page.');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
