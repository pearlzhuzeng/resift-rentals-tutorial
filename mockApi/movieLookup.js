import movies from './movies.json';

return movies.reduce((lookup, movie) => {
  lookup[movie.id] = movie;
  return lookup;
}, {});
