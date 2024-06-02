const Movie = require('../models/Movie'); // Assuming you have a Movie model

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  const { title, description, director, releaseDate, rating } = req.body;

  try {
    const newMovie = new Movie({
      title,
      description,
      director,
      releaseDate,
      rating,
    });

    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  const { title, description, director, releaseDate, rating } = req.body;

  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.director = director || movie.director;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.rating = rating || movie.rating;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await movie.remove();
    res.json({ message: 'Movie removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
