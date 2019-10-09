import { defineFetch } from 'resift';

const makeUpdateMovieFetch = defineFetch({
  displayName: 'Update Movie',
  share: {
    namespace: 'movie',
  },
  make: movieId => ({
    key: [movieId],
    // updatedMovie needs to be passed in as data to the PUT call.
    request: updatedMovie => ({ http }) =>
      http({
        method: 'PUT',
        route: `/movies/${movieId}`,
        data: updatedMovie,
      }),
  }),
});
export default makeUpdateMovieFetch;
