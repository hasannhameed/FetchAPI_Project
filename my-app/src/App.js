import './App.css';
import { useEffect, useState, useCallback } from 'react';
import MovieList from './MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          release_date: movieData.release_date,
          opening_text: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
      setShowMovies(true);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  return (
    <div className="App">
      <h1>This is a fetch API project</h1>
      <button onClick={() => setShowMovies((prev) => !prev)}>
        {showMovies ? 'Hide movies' : 'Show movies'}
      </button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {showMovies && !isLoading && <MovieList movies={movies} />}
    </div>
  );
}

export default App;
