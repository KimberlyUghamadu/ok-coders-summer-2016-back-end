var http = require('http')

var server = http.createServer(requestReceived)

<<<<<<< HEAD
function requestReceived(request, response) {
  console.log(request)
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end('200 okay')
}
server.listen('3000')
console.log('I\'m waiting')

=======
function requestReceived(req, res) {
  console.log(req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end("hello!!!!")
}

server.listen('3000')
console.log("I'm waiting")
>>>>>>> upstream/master
