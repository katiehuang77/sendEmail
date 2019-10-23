var _ = require('underscore');
var mongoose = require('mongoose');
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

var enablelogSchema = new mongoose.Schema({
    url: String,
    size:String,
    frequency: String,
    status:String,
    time : Date
}, 
{collection: "enablelog"}
);
var enablelog = mongoose.model('enablelog', enablelogSchema);

module.exports = {

    monitor:monitor,
    enablelog:enablelog
}

