import { createHttpService, createDataService } from 'resift';
import { genres, movies, movie } from 'mockApi';

const http = createHttpService({
  prefix: '/api',
  proxies: [genres, movies, movie],
});

const dataService = createDataService({
  services: { http },
  onError: e => {
    throw e;
  },
});

export default dataService;
