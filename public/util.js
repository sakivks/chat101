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
  config: {
    fbAppId: 175573409567618,
    loginRedirect: 'https://chat101.herokuapp.com/fbR',
    scope: 'public_profile,email,user_friends,user_birthday,user_about_me,read_custom_friendlists',
  },
};

export default util;
