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
        // db.track.find(body, function (err, newDoc) {   // Callback is optional
        //     // console.log(err);
        //     return defer.resolve(newDoc);
        // });

        db.track.find(body).sort({ time: -1 }).exec(function (err, docs) {
        // docs is [doc1, doc3, doc2]
            return defer.resolve(docs);
        });

        return defer.promise;
    }
}
