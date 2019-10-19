var _ = require('underscore');
var mongoose = require('mongoose');
var q=require('q');
var defer=q.defer();
var monitorSchema = new mongoose.Schema({
    url: String,
    Frequency: { type:Number,'default':1}
}, 
{collection: "monitor"});
var monitor = mongoose.model('monitor', monitorSchema);

module.exports = {

    save:function(body) {
        monitor.findOneAndUpdate({url:body},{$inc:{Frequency:1}},{upsert:true}, function(err, doc){
            if(err) {console.log(err)}
            else {console.log('success')}
            return defer.resolve('success')
        })
        return defer.promise;
    },

    get:function(body) {
        monitor.findOne({url:body}, function(err, doc){
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
        monitor.findOne({ url:body }).remove( function(err){
            if(err) {console.log(err)}
            else{console.log('success')}
            return defer.resolve('success')
        } )    
        return defer.promise;
    }


}
