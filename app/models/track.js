// var Datastore = require('nedb');
var q=require('q');
var defer=q.defer();
var mongoose = require('mongoose');
var trackSchema = new mongoose.Schema({
    url: String,
    Frequency: { type:Number,'default':1}
}, 
{collection: "track"});
var track = mongoose.model('track', trackSchema);

module.exports = {

    save:function(body) {
        track.findOneAndUpdate({url:body},{$inc:{Frequency:1}},{upsert:true}, function(err, doc){
            if(err) {console.log(err)}
            else {console.log('success')}
            return defer.resolve('success')
        })
        return defer.promise;
    },

    get:function(body) {
        track.findOne({url:body}, function(err, doc){
            if(err) {console.log(err)}
            else {console.log('success')}
            if(doc!=null){
                return defer.resolve(doc.Frequency)
            }
            return defer.resolve('0')
        })
        return defer.promise;
    },

    delete:function(body) {
        track.findOne({ url:body }).remove( function(err){
            if(err) {console.log(err)}
            else{console.log('success')}
            return defer.resolve('success')
        } )    
        return defer.promise;
    }
    
    // save:function(body) {
    //     var defer=q.defer();
    //     var db = {};
    //     // db.monitor = new Datastore('db/monitor.db');
    //     db.track = new Datastore('db/track');
    //     db.track.loadDatabase();
    //     db.track.find({url: body.url, size: body.size}, function (err, docs) {
            
    //         if(docs.length === 0){
    //             db.track.insert(body, function (err, newDoc) {   // Callback is optional
    //             console.log("====error" + err);
    //             return defer.resolve(newDoc || 'success');
    //             });
    //         } else if(docs[0].status !== body.status){
    //             db.track.update({url: body.url, size: body.size}, body, { multi: true }, function (err, newDoc) {
    //             console.log('updated successfully');
    //             console.log("====error" + err);
    //             return defer.resolve(newDoc || 'success');
    //             });
    //         } else {
    //             console.log("====error" + err);
    //             console.log('cc Url: ' + body.url);
    //             console.log(body.status + "==="+docs[0].status);
    //         }
    //         return defer.resolve(docs || 'success');
        
    //     });

    //     return defer.promise;
    // },

    // get:function(body){
    //     var defer=q.defer();
    //     var db = {};
    //     // db.monitor = new Datastore('db/monitor.db');
    //     db.track = new Datastore('db/track');
    //     db.track.loadDatabase();
    //     // db.track.find(body, function (err, newDoc) {   // Callback is optional
    //     //     // console.log(err);
    //     //     return defer.resolve(newDoc);
    //     // });

    //     db.track.find(body).sort({ time: -1 }).exec(function (err, docs) {
    //     // docs is [doc1, doc3, doc2]
    //         return defer.resolve(docs || 'success');
    //     });

    //     return defer.promise;
    // }
}
