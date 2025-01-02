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


// Route to get movies ordered by date
app.get('/movies/read/by-date', (req, res) => {
    const sortedByDate = [...movies].sort((a, b) => a.year - b.year);
    res.json({ status: 200, data: sortedByDate });
  });
  
  // Route to get movies ordered by rating
  app.get('/movies/read/by-rating', (req, res) => {
    const sortedByRating = [...movies].sort((a, b) => b.rating - a.rating);
    res.json({ status: 200, data: sortedByRating });
  });
  
  // Route to get movies ordered by title
  app.get('/movies/read/by-title', (req, res) => {
    const sortedByTitle = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    res.json({ status: 200, data: sortedByTitle });
  });


  // Route to get a movie by ID
app.get('/movies/read/id/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Parse ID from the URL
    const movie = movies.find(movie => movie.id === id); // Find the movie by ID
  
    if (movie) {
      res.json({ status: 200, data: movie });
    } else {
      res.status(404).json({ status: 404, error: true, message: `The movie ${id} does not exist` });
    }
  });
  

  // Route to add a new movie
app.get('/movies/add', (req, res) => {
    const { title, year, rating } = req.query;
  
    // Validation for title and year
    if (!title || !year || isNaN(year) || year.length !== 4) {
      return res
        .status(403)
        .json({ status: 403, error: true, message: 'You cannot create a movie without providing a title and a valid year' });
    }
  
    // Set default rating if not provided
    const newRating = rating ? parseFloat(rating) : 4;
  
    // Create the new movie
    const newMovie = {
      id: movies.length + 1, // Generate a unique ID
      title,
      year: parseInt(year, 10),
      rating: newRating,
    };
  
    // Add the new movie to the array
    movies.push(newMovie);
  
    // Respond with the updated movies list
    res.json({ status: 200, data: movies });
  });
  
  const express = require('express');
const app1 = express();

// Mock data for movies
const movies1 = [
    { id: 1, title: 'The Shawshank Redemption', year: 1994 },
    { id: 2, title: 'The Godfather', year: 1972 },
    { id: 3, title: 'The Dark Knight', year: 2008 },
];

// Route to handle movie requests by ID
app.get('/movies/read/id/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movie = movies.find(m => m.id === id);

    if (movie) {
        res.status(200).json({ status: 200, data: movie });
    } else {
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie ${id} does not exist`,
        });
    }
});


// Route to add a new movie
app.get('/movies/add', (req, res) => {
    const { title, year, rating } = req.query;

    // Validation for missing or invalid title and year
    if (!title || !year || isNaN(year) || year.length !== 4) {
        return res.status(403).json({
            status: 403,
            error: true,
            message: 'You cannot create a movie without providing a title and a year',
        });
    }

    // Default rating to 4 if missing
    const movieRating = rating ? parseFloat(rating) : 4;

    // Create new movie
    const newMovie = {
        id: movies.length + 1,
        title,
        year: parseInt(year, 10),
        rating: movieRating,
    };

    // Add new movie to the movies array
    movies.push(newMovie);

    // Respond with the updated list of movies
    res.status(200).json({ status: 200, data: movies });
});


// Route to delete a movie by ID
app.get('/movies/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    // Find the index of the movie with the given ID
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex !== -1) {
        // Remove the movie from the array
        movies.splice(movieIndex, 1);

        // Respond with the updated list of movies
        res.status(200).json({ status: 200, data: movies });
    } else {
        // Movie ID not found
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie ${id} does not exist`,
        });
    }
});



// Route to update a movie by ID
app.get('/movies/update/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, year, rating } = req.query;

    // Find the movie with the given ID
    const movie = movies.find(movie => movie.id === id);

    if (movie) {
        // Update only the fields provided in the query
        if (title) movie.title = title;
        if (year && !isNaN(year) && year.length === 4) movie.year = parseInt(year, 10);
        if (rating && !isNaN(rating)) movie.rating = parseFloat(rating);

        // Respond with the updated list of movies
        res.status(200).json({ status: 200, data: movies });
    } else {
        // Movie ID not found
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie ${id} does not exist`,
        });
    }
});