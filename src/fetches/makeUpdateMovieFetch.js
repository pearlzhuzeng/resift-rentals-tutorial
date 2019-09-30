import { defineFetch } from 'resift';

const makeUpdateMovieFetch = defineFetch({
  displayName: 'Update Movie',
  share: {
    namespace: 'movie',
  },
  make: movieId => ({
    key: [movieId],
    request: updatedMovie => ({ http }) =>
      http({
        method: 'PUT',
        route: `/movies/${movieId}`,
        data: updatedMovie,
      }),
  }),
});

export default makeUpdateMovieFetch;
