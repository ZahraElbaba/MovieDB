const express = require('express');
const app = express();

// Respond with "ok" for any URL
app.get('*', (req, res) => {
    res.send('ok');
});

// Start the server on a specified port (e.g., 3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// Route for /test
app.get('/test', (req, res) => {
  res.json({ status: 200, message: "ok" });
});

// Route for /time
app.get('/time', (req, res) => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`;
  res.json({ status: 200, message: time });
});

// Fallback route
app.get('*', (req, res) => {
  res.send('ok');
});

// Start the server
const PORT1 = 3000;
app.listen(PORT1, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
