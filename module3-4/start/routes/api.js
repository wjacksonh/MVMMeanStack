/**
 * Created by Walter on 4/3/2016.
 */

var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    
    if(req.method === 'GET'){
        return next();
    }
    
    if(!req.isAuthenticated()){
        return res.redirect('/#login');
    }
    
    return next();
});

router.route('/posts')
    // returns all posts
    .get(function (req, res) {
        // TODO: Temporary Solution
        res.send({message: 'TODO: return all posts'});
    })
    .post(function (req, res) {
        // TODO: Temporary Solution
        res.send({message: 'TODO: Create a new post'});
    });

router.route('/posts/:id')
    // returns a particular post posts
    .get(function (req, res) {
        // TODO: Temporary Solution
        res.send({message: 'TODO: return post with ID ' + req.params.id});
    })
    .put(function (req, res) {
        // TODO: Temporary Solution
        res.send({message: 'TODO: modify a put with ID ' + req.params.id});
    })
    .delete(function (req, res) {
        // TODO: Temporary Solution
        res.send({message: 'TODO: delete ID ' + req.params.id});
    });

module.exports = router;