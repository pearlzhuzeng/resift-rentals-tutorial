import { defineFetch } from 'resift';
import _get from 'lodash/get';

const makeGetMovies = defineFetch({
  displayName: 'Get Movies from Genre',
  share: {
    namespace: 'moviesOfGenre',
    merge: {
      moviesOfGenre: (previous, response) => {
        if (!previous) return response;

        return {
          results: [..._get(previous, ['results'], []), ..._get(response, ['results'], [])],
          paginationMeta: response.paginationMeta,
        };
      },
      movie: (previousMovies, incomingMovie) => {
        if (!previousMovies) return null;

        const index = previousMovies.results.findIndex(movie => movie.id === incomingMovie.id);

        if (index === -1) {
          return previousMovies;
        }

        return {
          ...previousMovies,
          results: [
            ...previousMovies.results.slice(0, index),
            {
              ...previousMovies.results[index],
              name: incomingMovie.name,
            },
            ...previousMovies.results.slice(index + 1, previousMovies.results.length),
          ],
        };
      },
    },
  },
  make: genreId => ({
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

export default makeGetMovies;
