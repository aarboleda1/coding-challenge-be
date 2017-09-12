const express = require('express')
const app = express()
const data = require('./data');
const {mockData} = data;
console.log(mockData)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.get('/data', function(req, res) {
  res.send(mockData);
})


app.listen(8080, function () {
  console.log('Example app listening on port 8080!')})