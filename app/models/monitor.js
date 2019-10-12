var Datastore = require('nedb');
var q=require('q');

module.exports = {
    
    save:function(body) {
        var defer=q.defer();
        var db = {};
        db.monitor = new Datastore('db/monitor');
        //db.track = new Datastore('db/track.db');
        db.monitor.loadDatabase();
        console.log(body)
        db.monitor.insert(body, function (err, newDoc) {   // Callback is optional
            console.log(err);
            return defer.resolve(newDoc);
        });

        return defer.promise;
    },

    get:function(body) {
        var defer=q.defer();
        var db = {};
        db.monitor = new Datastore('db/monitor');
        //db.track = new Datastore('db/track.db');
        db.monitor.loadDatabase();
        db.monitor.find(body, function (err, newDoc) {   // Callback is optional
            // console.log(err);
            return defer.resolve(newDoc);
        });
        return defer.promise;
    }
}

