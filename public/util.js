import 'whatwg-fetch';

const util = {
  fetch(url, details) {
    return fetch(url, { ...details, credentials: 'same-origin' });
  },
  clearSession() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    localStorage.removeItem('user.name');
    window.location.replace('/');
  },
};

export default util;
