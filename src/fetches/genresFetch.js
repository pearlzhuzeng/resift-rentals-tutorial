import { defineFetch } from 'resift';

const makeGenresFetch = defineFetch({
  displayName: 'Get Genres',
  make: () => ({
    key: [],
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: '/genres',
      }),
  }),
});

const genresFetch = makeGenresFetch();

export default genresFetch;
