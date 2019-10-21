var email=require('./email')
var q=require('q');
var _=require('lodash')
var monitors=require('./monitor')
var monitor=monitors.monitor

module.exports = {
    
    save:function(body) {
        var defer=q.defer();
        var currentData;
        filteredBody= body.filter(b=>b.status=="enabled");
        monitor.find({}, function(err, doc){
            if(err) {console.log(err);currentData=[]}
            else {currentData=doc}
            _.each(filteredBody, function(eachLog){
                currentData.find(function(item,i) {
                    if(item.url == eachLog.url && item.size==eachLog.size && item.status!="enabled"){
                        monitor.findOneAndUpdate({url:eachLog.url,size:eachLog.size},eachLog, function(err, doc){
                            if(err) {console.log(err)}
                            else {console.log('tracking is saved successfully '+eachLog.url)}
                            return defer.resolve('success')
                        })
                    }
                })
            });
        }) 
        return defer.promise;
    },

    get:function(body) {
        var defer=q.defer();
        monitor.find(body).sort({time: 1}).exec(function(err, docs) { 
            if(err) {console.log(err)}
            else {
                console.log('success')
                return defer.resolve(docs)
            }
         });
        return defer.promise;
    }
}
