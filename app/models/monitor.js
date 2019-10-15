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
        // db.monitor.find(body, function (err, newDoc) {   // Callback is optional
        //     // console.log(err);
        //     return defer.resolve(newDoc);
        // });
        // console.log(body);

        var sorturl ={url: -1};
        sorturl.url = Math.floor(Math.random() * 2) === 1? 1:-1;
 
        db.monitor.find(body).sort(sorturl).exec(function (err, docs) {
        // docs is [doc1, doc3, doc2]
            return defer.resolve(docs);
        });
        return defer.promise;
    },

    delete:function(body) {
        var defer=q.defer();
        var db = {};
        db.monitor = new Datastore('db/monitor');
        //db.track = new Datastore('db/track.db');
        db.monitor.loadDatabase();
        // db.monitor.find(body, function (err, newDoc) {   // Callback is optional
        //     // console.log(err);
        //     return defer.resolve(newDoc);
        // });
        if(body.url === ''){
            // console.log(body);
            return defer.promise;
        }
        db.monitor.remove(body, function (err, newDoc) {   // Callback is optional
            console.log(err);
            return defer.resolve(newDoc);
        });

        return defer.promise;
    }
}

