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


// Route for /hello/:id
app.get('/hello/:id?', (req, res) => {
    const { id } = req.params;
    const message = id ? `Hello, ${id}` : "Hello";
    res.json({ status: 200, message });
  });
  
  // Route for /search
  app.get('/search', (req, res) => {
    const { s } = req.query;
    if (s) {
      res.json({ status: 200, message: "ok", data: s });
    } else {
      res.status(500).json({ status: 500, error: true, message: "you have to provide a search" });
    }
  });

  const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]