var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var request = require('request');
var cheerio = require('cheerio');
var _  = require('lodash');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var url = 'http://pitchfork.com/reviews/best/albums';
var page = 1;
var options = {
  url: url,
  method: 'GET',
  qs: {
    page: page
  }  
}
request(options, genericCallback);
function genericCallback(err, res, body) {
  if(err) {
    console.log('Oops!', err);
  }else {
    if(res.statusCode === 200) {
      Parse(body);
    }
    else {
      console.log('can\'t parse!');
    }
    
  }
}
function Parse(body) {
  var $ = cheerio.load(body);
  getReviews($);
}
function getReviews(html) {
  var reviewContainer = html('div.fragment-list');
  var reviews = reviewContainer.find('div.review');
  parseReviews(reviews);
}
function parseReviews(reviews) {
  var parsedReviews = _.map(reviews, review => {
  var parsedMeta = parseMeta(review.children[1]);
  var parsedAnchor = parseAnchor(review.children[0]);
  //console.log(parsedAnchor);
  return _.merge({}, parsedAnchor, parsedMeta);
  });
  console.log(parsedReviews);
  
}
function parseAnchor(anchor) {
  //console.log('anchor: ', anchor);
  var albumArtist = anchor.children[1];
  var album = albumArtist.children[1].children[0].data;
  var artist = albumArtist.children[0].children[0].children[0].data;
 // console.log('album - ', children[0].data);
  console.log('artist - ', artist);
  return {artist: artist, album: album};
}
function parseMeta(meta) {
  var genre = meta.children[0].children[0].children[0].children[0].data;
  return {genre: genre};
}
//request('http://www.imdb.com', function(e))
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
