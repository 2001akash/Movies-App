const mongoose = require('mongoose');

const MovieListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  movies: [{ type: Object, required: true }],
  isPublic: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('MovieList', MovieListSchema);
