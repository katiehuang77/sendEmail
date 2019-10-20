var Datastore = require('nedb');
var q=require('q');
var email=require('./email')

module.exports = {
    
    save:function(body) {
        var defer=q.defer();
        var db = {};
        // var now = dateFormat(new Date(), "isoDateTime");
        // db.monitor = new Datastore('db/monitor.db');
        db.track = new Datastore('db/track');
        db.track.loadDatabase();
        console.log(body);
        // console.log('add track..');
        // var arraybody = body;

        // email.send(body);
        // var arraybody = body.split(',');
        // console.log(arraybody);

        // arraybody.forEach(function(currentbody){
        db.track.find({"status": "enabled"}, function (err, docs) {
            
            for (var i=0; i < body.length; i++){

                for(var j=0; j < docs.length; j++){

                    if(body[i].url === docs[j].url && body[i].size === docs[j].size && body[i].status !== docs[j].status) {
                        db.track.update({url: body[i].url, size: body[i].size}, body[i], { multi: true }, function (err, newDoc) {
                        console.log('==track updated==');
                        return defer.resolve(newDoc || 'success');
                        });
                    }
                }

                if(body[i].status === 'enabled'){

                    var isInsert = false;
                    for (var k =0; k< docs.length; k++){
                        if (body[i].url === docs[k].url && body[i].size === docs[k].size){
                            isInsert = true;
                        }
                    }
                    if(!isInsert){
                        db.track.insert(body[i], function (err, newDoc) {   // Callback is optional
                            console.log('==track insert==');
                            return defer.resolve(newDoc || 'success');
                        });
                    } else{
                        return defer.resolve(docs || 'success');
                    }
                }
                isInsert = false;

            }

            return defer.resolve(docs || 'success');

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
