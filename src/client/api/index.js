import Frisbee from 'frisbee';

const api = new Frisbee({
  baseURI: '/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
