const express = require('express');
const MovieList = require('../models/MovieList');
const auth = require('../middleware/auth');

const router = express.Router();

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

router.get('/', auth, async (req, res) => {
  try {
    const movieLists = await MovieList.find({ userId: req.userId });
    res.status(200).json(movieLists);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/public/:id', async (req, res) => {
  try {
    const movieList = await MovieList.findById(req.params.id);
    if (movieList.isPublic) {
      res.status(200).json(movieList);
    } else {
      res.status(403).json({ message: 'This list is private' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
