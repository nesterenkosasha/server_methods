var db = require('../db.js');

var renderById = function(req, res){
    return db.find(burger => burger.id === Number(req.params.id));
}

var checkDataIsObject = function(req, res, next){
    if(typeof(req.body) === 'object'){
        next()
    } else {
        res.status(422).send({ error: 'Invalid data'});
    }
}

var checkDataIsValid = function(req, res, next){
    if(req.body.hasOwnProperty("name")
        && req.body.hasOwnProperty("meat")
        && req.body.hasOwnProperty("price")){
        next()
    } else {
        res.status(400).send({ error: 'Invalid data'});
    }
}

var checkIdIsExist = function(req, res, next){
    if(db.find(burger => burger.id === Number(req.params.id))){
        next()
    } else {
        res.status(404).send({ error: 'Not Found'});
    }
}

module.exports.checkDataIsObject = checkDataIsObject
module.exports.checkIdIsExist = checkIdIsExist
module.exports.checkDataIsValid = checkDataIsValid
