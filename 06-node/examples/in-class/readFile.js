var fs = require('fs')

fs.readFile('../notes.md', readFileCallback)

var data = fs.readFileSync('../notes.md')
console.log('sync data', data.toString())
function readFileCallback(err, data) {
  if(err){
    throw err
  }else {
    console.log(data.toString())
  }
  
}
console.log('last thing')
var dataForFile = 'Hello world'
var outFile = 'temp.md'

fs.writeFile(outFile, dataForFile, writingComplete)

function writingComplete(err) {
 if(err) {throw err}
 console.log('Writing Complete')
 fs.stat(outFile, statCallback);
}
function statCallback(err,stats) {
  console.log('some stats')
  console.log(stats)
  fs.unlink(outFile, deleteCallback)
}

function deleteCallback(err) {
  if(err) {   
  }
  else{
    console.log('delete success')
  }
}
