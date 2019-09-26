import { createHttpProxy } from 'resift';

import genreLookup from './genreLookup';
import movieLookup from './movieLookup';

// Helpers
import _get from 'lodash/get'; // array helper
import paginate from './helpers/paginate';

const genreList = Object.values(genreLookup).map(genre => ({
  id: genre.id,
  name: genre.name,
}));

function mockDelay() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, 300);
    } catch (e) {
      reject(e);
    }
  });
}

export const genres = createHttpProxy('/genres', async ({ requestParams }) => {
  await mockDelay();
  return genreList;
});

export const movies = createHttpProxy('/genre/:id/movies', async ({ requestParams, match }) => {
  await mockDelay();
  const { id } = match.params;
  const genre = genreLookup[id];

  const { query } = requestParams;
  const pageSize = _get(query, ['pageSize']);

  if (!genre) {
    throw new Error('Genre not found');
  }

  if (!pageSize) {
    return {
      results: genre.movies,
    };
  }

  const currentPageNumber = _get(query, ['page']);
  return paginate(genre.movies, pageSize, currentPageNumber);
});

export const movie = createHttpProxy('/movies/:id', async ({ requestParams, match }) => {
  await mockDelay();
  const { id } = match.params;
  return movieLookup[id];
});
