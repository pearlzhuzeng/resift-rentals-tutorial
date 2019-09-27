import { defineFetch } from 'resift';

const makeMoviesFetch = defineFetch({
  displayName: 'Get Movies',
  make: genreId => ({
    key: [genreId],
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: `/genres/${genreId}/movies`,
      }),
  }),
});

export default makeMoviesFetch;
