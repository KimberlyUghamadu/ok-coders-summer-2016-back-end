
var fs = require('fs');

fs.readFile(process.argv[2], callback)

function callback(err, data) {
   if(err) throw err
   console.log(data.toString())
}
// ...
// and much more
