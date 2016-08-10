const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: String,
  emailId: String,
  username: String,
  password: String,
});

function cryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
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
