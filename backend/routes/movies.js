const express = require('express');
const MovieList = require('../models/MovieList');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/movies/create
router.post('/create', auth, async (req, res) => {
  const { title, movies, isPublic } = req.body;
  try {
    const newMovieList = new MovieList({ title, movies, isPublic, userId: req.userId });
    await newMovieList.save();
    res.status(201).json(newMovieList);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET /api/movies/
router.get('/', auth, async (req, res) => {
  try {
    const movieLists = await MovieList.find({ userId: req.userId });
    res.status(200).json(movieLists);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET /api/movies/public/:id
router.get('/public/:id', async (req, res) => {
  try {
    const movieList = await MovieList.findById(req.params.id);
    if (!movieList) {
      return res.status(404).json({ message: 'Movie list not found' });
    }
    if (movieList.isPublic) {
      res.status(200).json(movieList);
    } else {
      res.status(403).json({ message: 'This list is private' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// POST /api/movies/add-to-favorites
router.post('/add-to-favorites', auth, async (req, res) => {
  const { imdbID, title, poster } = req.body;

  try {
    const existingMovie = await MovieList.findOne({ imdbID });

    if (existingMovie) {
      return res.status(400).json({ message: 'Movie already exists in favorites' });
    }

    const newMovie = new MovieList({
      imdbID,
      title,
      poster,
      userId: req.userId,
    });

    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
    res.status(500).json({ message: 'Failed to add movie to favorites' });
  }
});

module.exports = router;
