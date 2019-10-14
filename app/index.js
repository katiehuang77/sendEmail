var express     = require('express'),
    _           = require('underscore'),
    fs          = require('fs'),
    bodyParser  = require('body-parser'),
    app         = express();



module.exports = function(conf) {
    app.conf = conf;
    app.use(bodyParser.json({limit: '50mb'}));//限制post数据大小
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
    app.use(app.router);  

    require(conf.paths.routes)(app);

    var httpserver;
    var http = require('http');
    httpserver = http.createServer(app);  
    http.globalAgent.maxSockets = 1000;
        

    httpserver.listen(conf.PORT, conf.HOST, function() {
        // app.log.info('http server listening on ' + (conf.HOST && conf.HOST.length ? conf.HOST : 'localhost') + ':' + conf.PORT);
        console.log('http server listening on ' + (conf.HOST && conf.HOST.length ? conf.HOST : 'localhost') + ':' + conf.PORT);
    });

    httpserver.on('request', function(req, res) {
        //console.log(res.statusCode);
    });
    return app;
};