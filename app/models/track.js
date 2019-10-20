var Datastore = require('nedb');
var q=require('q');

module.exports = {
    
    save:function(body) {
        var defer=q.defer();
        var db = {};
        // db.monitor = new Datastore('db/monitor.db');
        db.track = new Datastore('db/track');
        db.track.loadDatabase();
        // console.log(body);
        var arraybody = body;
        // var arraybody = body.split(',');
        // console.log(arraybody);
        arraybody.forEach(function(currentbody){
            db.track.find({url: currentbody.url, size: currentbody.size}, function (err, docs) {
            console.log('update - track');
            console.log(currentbody);
            
            if(docs.length === 0){
                db.track.insert(currentbody, function (err, newDoc) {   // Callback is optional
                // console.log("====error" + err);
                return defer.resolve(newDoc || 'success');
                });
            } else if(docs[0].status !== currentbody.status){
                db.track.update({url: currentbody.url, size: currentbody.size}, currentbody, { multi: true }, function (err, newDoc) {
                // console.log('updated successfully');
                // console.log("====error" + err);
                return defer.resolve(newDoc || 'success');
                });
            } 

            return defer.resolve(docs || 'success');
            });
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
            return defer.resolve(docs || 'success');
        });

        return defer.promise;
    }
}
