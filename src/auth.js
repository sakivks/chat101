const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username, password: password }, done);
}));

// User.findOne({ username: 'test' }, function(err, testUser) {
//   if (err) {
//     console.log("some error");
//   } else {
//     console.log("Working");
//   }
//   if (!testUser) {
//     console.log('test user did not exist; creating test user...')
//     testUser = new User({
//       username: 'test',
//       password: 'test'
//     })
//     testUser.save()
//   }
// })

// User.find(function(err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })
