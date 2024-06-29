import './App.css';
import { useState } from 'react';
import MovieList from './MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMovieHandler() {
    setIsLoading(true);
    if (!showMovies) {
      const response = await fetch('https://swapi.dev/api/films');
      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          release_date: movieData.release_date,
          opening_text: movieData.opening_crawl,
        };
      });

      setMovies(transformedMovies);
    }
    setShowMovies(!showMovies);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <h1>This is a fetch API project</h1>
      <button onClick={fetchMovieHandler}>
        {showMovies ? 'Hide movies' : 'Show movies'}
      </button>
      {isLoading && <p>Loading...</p>}
      {showMovies && !isLoading && <MovieList movies={movies} />}
    </div>
  );
}

export default App;
