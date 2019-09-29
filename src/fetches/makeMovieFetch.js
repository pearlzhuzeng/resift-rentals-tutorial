import { defineFetch } from 'resift';

const makeMovieFetch = defineFetch({
  displayName: 'Get Movie',
  make: movieId => ({
    key: [movieId],
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: `/movies/${movieId}`,
      }),
  }),
});

export default makeMovieFetch;
