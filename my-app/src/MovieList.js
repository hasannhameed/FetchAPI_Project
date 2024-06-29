import React from 'react';

const MovieList = (props) => {
  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {props.movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>ID: {movie.id}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Opening Text: {movie.opening_text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
