const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  gender: String,
});

userSchema.methods.validPassword = function (recievedPassword) {
  // var greeting = this.name
  //   ? "Meow name is " + this.name
  //   : "I don't have a name";
  // console.log(greeting);
  if (this.password === recievedPassword) {
    return true;
  }
  return false;
};

module.exports = mongoose.model('vikas_chat_user', userSchema);
