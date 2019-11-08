import { defineFetch } from 'resift';

const makeGetGenres = defineFetch({
  displayName: 'Get Genres',
  make: () => ({
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: '/genres',
      }),
  }),
});

const getGenres = makeGetGenres();

export default getGenres;
