var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');
var minMapNumber = 1001;
var maxMapNumber = 4994;
var sampleMapNumber = 2713;
var numberOfTimesCalled = 0;
loopOverMapNumbers(minMapNumber, maxMapNumber);
function loopOverMapNumbers(number, maxNumber) {
  if(number <= maxNumber) {
    console.log('starting to query map number: ', number);
    scrape(number);

  }
  else {
    console.log('done with all the numbers');
  }
}
function scrape(mapNumber) {
  var minMapNumber = 1001;
  var maxMapNumber = 4994;
  var sampleMapNumber = 2713;
  var numberOfTimesCalled = 0;
  var current;
  var currentState;
  var accountNumberGatherer = [];
  queryMapNumber(sampleMapNumber, false,1,"")
  var current;
  var currentState;
  var accountNumberGatherer = [];
  queryMapNumber(mapNumber, false,1,"")
 function queryMapNumber(mapNumber,nextPage,page, state) {
   numberOfTimesCalled++;
   current = mapNumber;
   var url = "http://www.oklahomacounty.org/assessor/Searches/MapNumber.asp";
   var method = 'POST';
   if(nextPage) {
     var form = {
       fpdbr_0_PagingMove: "  >   ",
       Map: mapNumber
     };
   
   }
   else {
     var form = {Map: mapNumber};
   }
   if(state) {
     var headers = {
       Cookie: state
     };
       
   }
   else {
     var headers = {};
   }
   var options = {
        url: url,
        method: method,
        form: form,
        headers: headers
   };
   
   request(options, mapQueryCallback);

 }
 function mapQueryCallback(err, res, body) {
  if(err) {
    console.log('error', err);
  }
  else {
    //console.log('statusCode', res.statusCode);
    if(res.statusCode == 200) {
      if(!currentState) {
        currentState = _.replace(res.headers['set-cookie'][0], ' path=/','');
        console.log(currentState);
      }
      console.log(res.headers['set-cookie'][0].split(";")[0]);
      gatherAcctNo(body);
    }
  //  console.log('body', body);
  }
}
// after getting back body from request, we pass it to this function so that
// cheerio can pull out the links that we are interested in. It also, if there
// are multiple pages, continues to walk those pages with subsequent requests
function gatherAcctNo(body) {
  var $ = cheerio.load(body);
  //*=contains
  var accountNoElements = $('a[href*="ACCOUNTNO"]');
  var accountNumbers = _.map(accountNoElements, elem => {//elem.attribs.href
    return _.trim(elem.children[1].children[0].data)});
  accountNumberGatherer= _.union(accountNumberGatherer, accountNumbers);
  //console.log(accountNoElements);
  console.log('discovered ' +accountNumbers.length+ ' account links');
  var page = pageInfo($);
  if(page.pagesLeft > 0) {
     queryMapNumber(current, true, page.currentPage+1, currentState);
  }
  else {
    console.log('no more pages');
    console.log(`I have ${accountNumberGatherer.length} links to gather`);
  //  loopOverMapNumbers(current + 1, maxMapNumber);
    crawlAcctNumbers(accountNumberGatherer);
  }

 
}
function crawlAcctNumbers(accountNumbers) {
  _.each(accountNumbers, accountNumber => {
    queryAcctNumber(accountNumber)
  });
}
function queryAcctNumber(accountNumber) {
  var baseUrl = "http://www.oklahomacounty.org/assessor/Searches/AN-R.asp";
  var options = {
    url: baseUrl,
    method: 'GET',
    qs: {
      ACCOUNTNO: accountNumber
    }
  };
  request(options, accountNumberCallback);
}
function accountNumberCallback(err, res, data) {
  console.log('data from account number query');
  console.log(data);
}
function pageInfo(body) {
  var pageSummary = _.trim(body('nobr').text());
  
  if(pageSummary) {
    //var pattern = /\[(.*)\/(.*)\]/;
    var pattern = /\[(.*)\/(.*)\]/;
    var matches = pageSummary.match(pattern);
    // +(string) coerces the string to a number.
    var currentPage = +(matches[1]);
    var totalPages = +(matches[2]);
  }
  else {
      var currentPage = 1;
      var totalPages = 1;
  }
  
  console.log('pageSummary ', pageSummary);
  return {
    currentPage: currentPage,
    totalPages: totalPages,
    pagesLeft: totalPages - currentPage
  };
}

}

//queryMapNumber(sampleMapNumber, state, nextPage, page);
 // var url = "http://www.oklahomacounty.org/assessor/Searches/MapNumber.asp";
 //  var method = 'POST';
 //  var form = {Map: sampleMapNumber};
 //  var options = {
 //    url: url,
 //    method: method,
 //    form: form,state,,page
 //  };

 




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
