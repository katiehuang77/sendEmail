var track=require('../models/errorTrack.js');

module.exports = function(app) {
     app.post(app.conf.routePrefix + '/sendEmail', function(req, res, next) {
        track.sendEmail(req.body).then(function(data){
            res.status(200).send(data);
        }).fail(function(error){
            res.send(error);
        })            
    });
}