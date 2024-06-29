import './App.css';
import { useEffect, useState, useCallback } from 'react';
import MovieList from './MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryIntervalId, setRetryIntervalId] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Something went wrong ...Retrying');
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
      if (retryIntervalId) {
        clearInterval(retryIntervalId);
        setRetryIntervalId(null);
      }
    } catch (error) {
      setError(error.message);
      const intervalId = setInterval(fetchMovieHandler, 5000);
      setRetryIntervalId(intervalId);
    }
    setIsLoading(false);
  }, [retryIntervalId]);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const cancelRetryHandler = () => {
    if (retryIntervalId) {
      clearInterval(retryIntervalId);
      setRetryIntervalId(null);
      setError('Retrying canceled by user.');
    }
  };

  return (
    <div className="App">
      <h1>This is a fetch API project</h1>
      <button onClick={() => setShowMovies((prev) => !prev)}>
        {showMovies ? 'Hide movies' : 'Show movies'}
      </button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && (
        <div>
          <p>{error}</p>
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        </div>
      )}
      {showMovies && !isLoading && <MovieList movies={movies} />}
    </div>
  );
}

export default App;
