const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  emailId: String,
  username: String,
  password: String,
});

userSchema.methods.validPassword = function (recievedPassword) {
  if (this.password === recievedPassword) {
    return true;
  }
  return false;
};

module.exports = mongoose.model('vikas_chat_user', userSchema);
