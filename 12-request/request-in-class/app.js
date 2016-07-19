var request = require('request')



function generalCallback(err, response, body) {
  if(err) {
    console.log('oops');
  }else {
  	console.log('response: ', response);
  	console.log('body: ', body);
  }
}
var options = { 
  url: 'http://pitchfork.com/reviews/best/albums',
  method: 'GET',
  headers: {
  	chicken: 'duck',
  	accept: 'text/html'
  }
};

request(options, generalCallback);
