var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var main = require('./routes/main');
var redis = require('./redis');

var app = express();

// view engine setup
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* routes */
app.use('/', main);
//app.use('/redis/keys', redis);

app.get('/redis/keys', function(req, res){
    var criteria = req.query.criteria;
    redis.keys(criteria, res);
});

app.get('/redis/caches/:key', function (req, res) {
    var key = req.params.key;
    redis.hget(key, res);
});

app.delete('/redis/caches/:key', function (req, res) {
    var key = req.params.key;
    redis.cacheClear(key);
})

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/

module.exports = app;
