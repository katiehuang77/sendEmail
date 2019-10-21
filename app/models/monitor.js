var _ = require('underscore');
var mongoose = require('mongoose');
var q=require('q');
var monitorSchema = new mongoose.Schema({
    url: String,
    size:String,
    frequency: String,
    status:{ type:String,'default':'disabled'},
    time : Date
}, 
{collection: "monitor"}
);
var monitor = mongoose.model('monitor', monitorSchema);

module.exports = {
    
    save:function(body) {
        var defer=q.defer();
        monitor.findOneAndUpdate(body,body,{upsert:true}, function(err, doc){
            if(err) {console.log(err)}
            else {console.log(body)}
            return defer.resolve('success')
        })
        return defer.promise;
    },

    get:function(body) {
        var defer=q.defer();
        monitor.find(body,{},{sort:{url:1}},function(err,docs) { 
            if(err) {console.log(err)}
            else {
                console.log(docs);
                return defer.resolve(docs)
            }
         });
        return defer.promise;
    },

    delete:function(body) {
        var defer=q.defer();
        if (body.url === ''){
            return defer.promise;
        }
        if (body.url.indexOf('sortOrder=publishdate') !== -1 || (body.url.indexOf('http') !== -1 && body.size === '')){
            monitor.findOne({ url:body.url }).remove( function(err){
                if(err) {console.log(err)}
                else{console.log('remove '+body.url)}
                return defer.resolve('success')
            } ) 
        } else {
            monitor.find(body).remove( function(err){
                if(err) {console.log(err)}
                else{console.log('remove '+body.url)}
                return defer.resolve('success')
            } )
        }
        return defer.promise;
    },

    monitor:monitor
}

