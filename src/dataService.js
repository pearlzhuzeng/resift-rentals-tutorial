import { createHttpService, createDateService } from 'resift';

const http = createHttpService({
  prefix: '/api',
});

const services = { http };

const dataService = createDateService({
  services,
  onError: e => {
    throw e;
  },
});

export default dataService;
