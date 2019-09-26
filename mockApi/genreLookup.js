// This file performs data transformation from movies into a genreLookup
// Resulting shape:
// {
//   id: string,
//   genre: Genre
// }
// Genre: {
//   id: string,
//   name: string,
//   movies: Movie[] // Sorted with rotten tomato score from high to low
// }
// Movie: {
//   id: string,
//   name: string,
//   imageUrl: string
// }

import movies from './movies.json';
import _flatten from 'lodash/flatten';
import stringHash from 'string-hash'; // generate hash from string

const genreAndMovieTuples = _flatten(
  movies.map(movie => movie.genres.map(genre => ({ genre, movie }))),
);

const genreMoviesLookup = genreAndMovieTuples.reduce((lookup, { genre, movie }) => {
  const movies = lookup[genre] || [];
  movies.push(movie);
  lookup[genre] = movies;
  return lookup;
}, {});

const normalizedGenreMoviesLookup = Object.entries(genreMoviesLookup).map(([genre, movies]) => ({
  id: stringHash(genre),
  name: genre,
  movies: movies
    .sort((a, b) => b.tomatoScore - a.tomatoScore)
    .map(movie => ({
      id: movie.id,
      name: movie.name,
      imageUrl: movie.imageUrl,
    })),
}));

return normalizedGenreMoviesLookup.reduce((lookup, genre) => {
  lookup[genre.id] = genre;
  return lookup;
}, {});
