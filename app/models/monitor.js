var _ = require('underscore');
var q=require('q');
var db=require('./db')
var monitor=db.monitor

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
                // console.log(docs);
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

