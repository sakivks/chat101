const User = require('../models/user.js');

const auth = {
  verify(credential) {
    return new Promise((resolve, reject) => {
      User.findOne({ username: credential.username })
        .then((user) => {
          if (user === null) {
            console.log('user not present');
            reject({ info: 'Username incorrect' });
          } else if (user.validPassword(credential.password)) {
            console.log('Authenticated');
            resolve();
          } else {
            console.log('Invalid Password');
            reject({ info: 'Password incorrect' });
          }
        }).catch((err) => {
          console.log(`Error in fetching user from DB for auth: \n${err}`);
          reject({ info: 'some error while fetching from DB' });
        });
    });
  },
};

module.exports = auth;
