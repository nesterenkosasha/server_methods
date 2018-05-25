var express = require('express');
var router = express.Router();
var db = require('../db.js');
var {checkIdIsExist, checkDataIsValid, checkDataIsObject} = require('./utils.js')
/* GET burgers listing. */
router.get('/', function(req, res, next) {
  res.status(200).send(db);
});

/* GET burger listing. */
router.get('/:id', checkIdIsExist, function(req, res, next) {
  res.status(200).send(db.find(burger => burger.id === Number(req.params.id)));
});

/* POST burger listing. */
router.post('/', checkDataIsValid, function (req, res) {
  db.push({...req.body, id: Date.now()});
  res.status(200).send(db[db.length-1]);
});

/* PATCH burger listing. */
router.patch('/:id', [checkIdIsExist, checkDataIsObject], function (req, res, next) {
  var burg;
    db = db.map(burger => {
      if( burger.id === Number(req.params.id)){
        return burg = {...burger, ...req.body}
      } else {
        return burger
      }  
    })
   res.status(200).send(burg);
});


/* PUT burger listing. */
router.put('/:id', [checkIdIsExist, checkDataIsObject, checkDataIsValid], function (req, res) {
  db = db.map(burger => {
    if( burger.id === Number(req.params.id)){
      return req.body
    } else {
      return burger
    }  
  })
  res.status(200).send(req.body);
});

/* DELETE burger listing. */
router.delete('/:id', checkIdIsExist, function (req, res) {
  db = db.filter(burger => burger.id !== Number(req.params.id))
  res.status(202).send('Got a DELETE request at /user');
});



module.exports = router;
