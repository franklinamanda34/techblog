const passport = require('passport');
const User = require('../models/user');
const userController = {
getSignup: (req,res) => {
res.render('user/signup');
},
postSignUp: async(req, res) => {
const {username, password} = req.body;
try {
const newUser = new User({username, password});
await newUser.save();
req.login(newUser, (err) => {
if(err) {
console.error(err);
return res.status(500).send('error');
}
res.redirect('/dashboard');
});
} catch (err) {
console.error(err);
res.status(500).send('Internal Server Error');
  }
},
getSignIn: (req, res) => {
res.render('user/signin');
},
postSignIn: passport.authenticate('local', {
successRedirect: '/dashboard',
failureRedirect: '/signin',
failureFlash: true,
}),
getLogout: (req, res) => {
req.logout();
res.redirect('/');
},
};
module.exports = userController;

