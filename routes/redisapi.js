var express = require('express');
var app = express();

// API
app.get('/redis/keys', function(req, res){

    var criteria = req.params.criteria;
    var result  = redis.keys(criteria);

    console.log(">> Redis key 조회 - criteria: " + criteria + ", result: " + result);

    res.json(result);
});

module.exports = app;
