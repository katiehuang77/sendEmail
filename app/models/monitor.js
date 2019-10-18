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
            return defer.resolve(newDoc || 'success');
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
        db.track = new Datastore('db/track');
        //db.track = new Datastore('db/track.db');
        db.monitor.loadDatabase();
        db.track.loadDatabase();
        // db.monitor.find(body, function (err, newDoc) {   // Callback is optional
        //     // console.log(err);
        //     return defer.resolve(newDoc);
        // });
        if (body.url === ''){
            // console.log(body);
            return defer.promise;
        }
        if (body.url.indexOf('sortOrder=publishdate') !== -1 || (body.url.indexOf('sortOrder=publishdate') !== -1 && body.size === '')){
            db.monitor.remove({url : body.url}, function (err, newDoc) {   // Callback is optional
                console.log(err);
                // return defer.resolve(newDoc || 'success');
             });
            db.track.remove({url : body.url}, function (err, newDoc) {   // Callback is optional
                console.log(err);
                return defer.resolve(newDoc || 'success');
             });
        } else {
            db.monitor.remove(body, function (err, newDoc) {   // Callback is optional
            console.log(err);
            // return defer.resolve(newDoc || 'success');
            });
            db.track.remove(body, function (err, newDoc) {   // Callback is optional
            console.log(err);
            return defer.resolve(newDoc || 'success');
            });
        }

        return defer.promise;
    }
}

