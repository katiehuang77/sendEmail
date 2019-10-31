var email=require('./email')
var q=require('q');
var _=require('lodash')
var db=require('./db')
var monitor=db.monitor
var enablelog=db.enablelog

module.exports = {
    
    save:function(body) {
        var defer=q.defer();
        var currentData;
        // filteredBody= body.filter(b=>b.status=="enabled");
        console.log(body)
        monitor.find({}, function(err, doc){
            if(err) {console.log(err);currentData=[]}
            else {currentData=doc}
            _.each(body, function(eachLog){
                currentData.find(function(item,i) {
                    if(item.url === eachLog.url && item.size === eachLog.size && item.status !== eachLog.status){
                        if(eachLog.status === 'enabled'){
                            console.log('send email');
                            // email.send(eachLog);
                            var options = { upsert: true, new: true, setDefaultsOnInsert: true };
                            enablelog.findOneAndUpdate(eachLog,eachLog, options, function(err, doc){
                                if(err) {console.log(err)}
                                else {console.log('enablelog is saved successfully '+eachLog.url + 'size: ' + eachLog.size + 'status: ' + eachLog.status)}
                                return defer.resolve('success')
                            })
                        }
                        monitor.findOneAndUpdate({url:eachLog.url,size:eachLog.size},eachLog, function(err, doc){
                            if(err) {console.log(err)}
                            else {console.log('tracking is saved successfully '+eachLog.url + 'size: ' + eachLog.size + 'status: ' + eachLog.status)}
                            return defer.resolve('success')
                        })
                    }
                    return defer.resolve('success')
                })
            });
        }) 
        return defer.promise;
    },

    get:function(body) {
        var defer=q.defer();
        monitor.find(body).sort({utctime: -1}).exec(function(err, docs) { 
            if(err) {console.log(err)}
            else {
                console.log('3s track get')
                return defer.resolve(docs)
            }
         });
        return defer.promise;
    },

    getenablelog:function() {
        var defer=q.defer();
        enablelog.find().sort({utctime: -1}).exec(function(err, docs) { 
            if(err) {console.log(err)}
            else {
                console.log('3s track get')
                return defer.resolve(docs)
            }
         });
        return defer.promise;
    }
}
