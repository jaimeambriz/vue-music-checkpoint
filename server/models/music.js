var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId


var schema = new mongoose.Schema({
    mediaUrl: { type: String, required: true },
    songTitle: { type: String, required: true },
    Artist: { type: String, require: true }
});

module.exports = mongoose.model('Song', schema)