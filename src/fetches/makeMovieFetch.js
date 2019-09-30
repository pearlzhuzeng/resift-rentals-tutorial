import { defineFetch } from 'resift';

const makeMovieFetch = defineFetch({
  displayName: 'Get Movie',
  share: {
    namespace: 'movie',
  },
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
