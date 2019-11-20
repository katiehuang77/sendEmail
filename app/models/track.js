var email=require('./email')
var q=require('q');
var _=require('lodash')
var db=require('./db')
var monitor=db.monitor
var enablelog=db.enablelog
var myDate0;
var myDate100;
var count =0;

module.exports = {
    
    save:function(body) {
        var defer=q.defer();
        var currentData;
        // filteredBody= body.filter(b=>b.status=="enabled");
        if(count === 0){
            myDate0 = Date.now();
        }else if(count >100){
            count = 0;
            myDate100 = Date.now();
        } else {
            count++
        }

        console.log(myDate0);
        console.log(myDate100);

        console.log("-------100 times spend " + (myDate100 - myDate0) + " seconds -------");
        

        console.log(body)
        monitor.find({}, function(err, doc){
            if(err) {console.log(err);currentData=[]}
            else {currentData=doc}
            _.each(body, function(eachLog){
                currentData.find(function(item,i) {
                    if(item.url.indexOf(eachLog.url.split("/")[eachLog.url.split("/").length -1]) !== -1 && eachLog.url.split("/")[eachLog.url.split("/").length -1].length < 20 && item.size === eachLog.size && item.status !== eachLog.status){
                        if(eachLog.status === 'enabled'){
                            console.log('send email');
                            // email.send(eachLog);
                            var options = { upsert: true, new: true, setDefaultsOnInsert: true };
                            enablelog.findOneAndUpdate(eachLog, eachLog, options, function(err, doc){
                                if(err) {console.log(err)}
                                else {console.log('enablelog is saved successfully '+eachLog.url + 'size: ' + eachLog.size + 'status: ' + eachLog.status)}
                                return defer.resolve('success')
                            })
                        }
                        monitor.findOneAndUpdate({url:item.url,size:item.size},eachLog, function(err, doc){
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
