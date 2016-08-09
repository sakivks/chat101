import 'whatwg-fetch';

const util = {
  fetch(url, details) {
    return fetch(url, { ...details, credentials: 'same-origin' });
  },
  data: 'somedata',
};

export default util;
