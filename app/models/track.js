var Datastore = require('nedb');
var q=require('q');

module.exports = {
    
    save:function(body) {
        var defer=q.defer();
        var db = {};
        // db.monitor = new Datastore('db/monitor.db');
        db.track = new Datastore('db/track');
        db.track.loadDatabase();
        db.track.insert(body, function (err, newDoc) {   // Callback is optional
            console.log(err);
            return defer.resolve(newDoc);
        });

        return defer.promise;
    },

    get:function(body){
        var defer=q.defer();
        var db = {};
        // db.monitor = new Datastore('db/monitor.db');
        db.track = new Datastore('db/track');
        db.track.loadDatabase();
        db.track.find(body, function (err, newDoc) {   // Callback is optional
            // console.log(err);
            return defer.resolve(newDoc);
        });
        return defer.promise;
    }
}
