import { defineFetch } from 'resift';

const makeGetMovie = defineFetch({
  displayName: 'Get Movie',
  share: {
    namespace: 'movie',
  },
  make: movieId => ({
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: `/movies/${movieId}`,
      }),
  }),
});
export default makeGetMovie;
