module.exports = function(app) {

var _                 = require('underscore'),
    fs                = require('fs'),
    path              = require('path');

app.all('/*', nocache);

function nocache(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Pragma', 'no-cache');
  res.header("Expires", 0);
  res.header("Access-Control-Allow-Headers", '*');
  next();
}

fs.readdirSync(__dirname).forEach(function(file) {
  if (file !== "index.js" && path.extname(file) === '.js'){
    console.log('loading routes from ' + file);
    require(path.join(__dirname,file))(app);
  }
});

console.log('loading default route');
app.get('/', function(req,res){
  res.send({ 'hello': 'world' });
});

};

