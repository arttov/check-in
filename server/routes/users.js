let express = require('express');
let router = express.Router();
let User = require('../models/Users.js');

/* GET ALL USERS */
router.get('/', function(req, res, next) {

  let earthRadius = 6378.1, //km
      searchInRadius = 200,
      distance = searchInRadius / earthRadius; //km

  //get nearby users
  User.collection.geoNear([44.43571, 40.16134], {
    maxDistance : distance,
    distanceMultiplier: earthRadius,
    spherical: true,
    num: 10
    },

    function (err, user) {
    if (err) return next(err);
    console.log(user.results[2].dis);
      res.json(user.results);
  }
  );
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE USER */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  let query = {'id':req.params.id};
  User.findOneAndUpdate(query, req.body, {new:true}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
