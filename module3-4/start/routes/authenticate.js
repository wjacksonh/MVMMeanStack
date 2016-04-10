/**
 * Created by Walter on 4/3/2016.
 */

var express = require('express');
var router = express.Router();

module.exports = function (passport) {
    
    // Sends sucessful login state back to angular
    router.post('/success', function (req, res) {
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    // Sends failure login state back to angular
    router.post('/failure', function (req, res) {
        res.send({state: 'failure', user: null, message: 'Invalid username or password'});
    });
    
    // send successful login state back to angular
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    // send successful login state back to angular
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};