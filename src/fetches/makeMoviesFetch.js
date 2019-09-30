import { defineFetch } from 'resift';
import _get from 'lodash/get';

const makeMoviesFetch = defineFetch({
  displayName: 'Get Genre Movies',
  share: {
    namespace: 'moviesOfGenre',
    merge: (previous, response) => {
      if (!previous) return response;

      return {
        results: [..._get(previous, ['results'], []), ..._get(response, ['results'], [])],
        paginationMeta: response.paginationMeta,
      };
    },
  },
  make: genreId => ({
    key: [genreId],
    request: page => ({ http }) =>
      http({
        method: 'GET',
        route: `/genres/${genreId}/movies`,
        query: {
          page,
          pageSize: 10,
        },
      }),
  }),
});

export default makeMoviesFetch;
