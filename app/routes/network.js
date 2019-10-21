var email=require('../models/errorTrack.js');
var monitor=require('../models/monitor.js');
var track=require('../models/track.js');
var fs = require('fs');

module.exports = function(app) {
    app.post(app.conf.routePrefix + '/sendEmail', function(req, res, next) {
        email.sendEmail(req.body).then(function(data){
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });

    app.post(app.conf.routePrefix + '/monitor', function(req, res, next) {
        monitor.save(req.body).then(function(data){
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });

    app.post(app.conf.routePrefix + '/getmonitor', function(req, res, next) {
        monitor.get(req.body).then(function(data){
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });

    app.post(app.conf.routePrefix + '/deletemonitor', function(req, res, next) {
        monitor.delete(req.body).then(function(data){
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });

    app.post(app.conf.routePrefix + '/track', function(req, res, next) {
        // console.log(req.body);
        track.save(req.body).then(function(data){
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });

    app.post(app.conf.routePrefix + '/gettrack', function(req, res, next) {
        track.get(req.body).then(function(data){
            res.header("Access-Control-Allow-Origin", "*");
            // console.log(data)
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });

    app.get(app.conf.routePrefix + '/dashboard', function(req, res, next) {
        // res.sendFile('testData/filter.html');

        // let file = 'testData/filter.html'      
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        fs.createReadStream('html/dashboard.html').pipe(res);

    });
}