import movies from './movies.json';

const movieLookup = movies.reduce((lookup, movie) => {
  lookup[movie.id] = movie;
  return lookup;
}, {});

export default movieLookup;
