/**
 * Created by Walter on 4/3/2016.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

var LocalStratagy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        console.log('serializing user:', user.username);
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            console.log('deserializing user:', user.username);
            done(err, user);
        });
    });

    passport.use('login', new LocalStratagy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            User.findOne({username: username}, function (err, user) {

                if (err) {
                    return done(err, false);
                }

                if (!user) {
                    return done('User not found', false);
                }

                if (!isValidPassword(user, password)) {
                    return done('User not authenticated', false);
                }

                console.log('User ' + username + ' successfully signed in');
                return done(null, user);
            });
        })
    );

    passport.use('signup', new LocalStratagy({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {

            // find a user in mongo with provided username
            User.findOne({'username': username}, function (err, user) {
                // In case of any error, return using the done method
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false);
                } else {
                    // if there is no user, create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);

                    // save the user
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log(newUser.username + ' Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        })
    );

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    };

    /**
     * Generates has using bcrypt
     */
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

};