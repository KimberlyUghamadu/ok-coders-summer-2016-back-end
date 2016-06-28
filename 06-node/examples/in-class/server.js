var http = require('http')

var server = http.createServer(requestReceived)

function requestReceived(request, response) {
  console.log(request)
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end('200 okay')
}
server.listen('3000')
console.log('I\'m waiting')

