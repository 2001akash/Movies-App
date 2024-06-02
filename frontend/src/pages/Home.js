import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [movieLists, setMovieLists] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovieLists = async () => {
      const { data } = await axios.get('http://localhost:5000/api/movies', {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` },
      });
      setMovieLists(data);
    };

    fetchMovieLists();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}`);
    setSearchResult(data.Search);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h2>Search Results</h2>
        {searchResult && searchResult.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>

      <div>
        <h2>My Movie Lists</h2>
        {movieLists.map((list) => (
          <div key={list._id}>
            <h3>{list.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
