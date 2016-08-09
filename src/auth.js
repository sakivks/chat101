const User = require('../models/user.js');

const auth = {
  verify(credential) {
    return new Promise((resolve, reject) => {
      User.findOne({ username: credential.username })
        .then((user) => {
          if (user === null) {
            console.log(`user not found : ${credential.username}`);
            reject({ info: 'Username incorrect' });
          } else if (user.validPassword(credential.password)) {
            console.log(`Authenticated : ${credential.username}`);
            resolve(user);
          } else {
            console.log(`Invalid Password : ${credential.username}`);
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
