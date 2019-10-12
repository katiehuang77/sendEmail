var email=require('../models/errorTrack.js');
var monitor=require('../models/monitor.js');
var track=require('../models/track.js');

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
        	console.log(data)
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });

    app.post(app.conf.routePrefix + '/track', function(req, res, next) {
        track.save(req.body).then(function(data){
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });

    app.post(app.conf.routePrefix + '/gettrack', function(req, res, next) {
        track.get(req.body).then(function(data){
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });
}