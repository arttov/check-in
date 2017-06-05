let express = require('express');
let router = express.Router();
let User = require('../models/Users.js');

/* GET ALL NEAR BY USERS BY RADIUS */
router.get('/:longitude/:latitude', function(req, res, next) {

  let longitude = +req.params.longitude;
  let latitude = +req.params.latitude;

  //generate distance value by km
  let earthRadius = 6378.1, //km
    searchInRadius = 7.1, //km
    distance = searchInRadius / earthRadius; //km

  //get nearby users
   User.collection.geoNear([longitude, latitude], {
      maxDistance : distance,
      distanceMultiplier: earthRadius,
      spherical: true,
      num: 10
    },
    function (err, user) {
      if (err)  handleError(res, err.message, "Failed to get users.");

      if(user) {
        res.json(user.results);
      }
    }
  );
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* SAVE USER */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  let query = {'id':req.params.id};
  User.findOneAndUpdate(query, req.body, {new:true}, function (err, user) {
    if (err) return next(err);

    //check if user not exist in db create new user
    if(user === null) {
      User.create(req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
      });
    } else {
      res.json(user);
    }
  });
});


/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  User.findOneAndRemove({'id':req.params.id}, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

module.exports = router;
