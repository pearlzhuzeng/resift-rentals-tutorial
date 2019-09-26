import { createHttpProxy } from 'resift';
import genreLookup from './genreLookup';
import movieLookup from './movieLookup';

function timer(milliseconds) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, milliseconds);
    } catch (e) {
      reject(e);
    }
  });
}

const mockDelay = timer(300);

export const genres = createHttpProxy('/genres', async ({ requestParams }) => {
  await mockDelay;
  return Object.values(genreLookup);
});

export const genre = createHttpProxy('/genres/:id', async ({ requestParams, match }) => {
  await mockDelay;
  const { id } = match.params;
  return genreLookup.find(genre => genre.id === id);
});

export const movies = createHttpProxy('/genre/:id/movies', async ({ requestParams, match }) => {
  await mockDelay;
  const { id } = match.params;
  const genre = genreLookup.find(genre => genre.id === id);
  return genre.movies;
});

export const movie = createHttpProxy('movies/:id', async ({ requestParams, match }) => {
  await mockDelay;
  const { id } = match.params;
  return movieLookup.find(movie => movie.id === id);
});
