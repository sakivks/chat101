const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: String,
  emailId: String,
  username: String,
  password: String,
});

function cryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

userSchema.methods.validPassword = function (recievedPassword) {
  return comparePassword(recievedPassword, this.password);
};

userSchema.pre('save', function (next) {
  this.password = cryptPassword(this.password);
  next();
});

module.exports = mongoose.model('vikas_chat_user', userSchema);


// function cryptPassword(password) {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) {
//         return reject(err);
//       }
//       return bcrypt.hash(password, salt, (err2, hash) => {
//         if (err2) {
//           return reject(err);
//         }
//         return resolve(hash);
//       });
//     });
//   });
// }

// function comparePassword(password, userPassword) {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, userPassword, (err, isPasswordMatch) => {
//       if (err) {
//         return reject(err);
//       }
//       console.log(isPasswordMatch);
//       return resolve(isPasswordMatch);
//     });
//   });
// }

// userSchema.methods.validPassword = function (recievedPassword) {
//   var status = false;
//   comparePassword(recievedPassword, this.password)
//     .then(isPasswordMatch => {
//       status = isPasswordMatch;
//     });
//   return status;
// };

// userSchema.pre('save', function (next) {
//   cryptPassword(this.password)
//     .then((hash) => {
//       this.password = hash;
//       next();
//     })
//     .then(null, () => {
//       console.error('Some error while encrypting the password please try again');
//     });
// });
