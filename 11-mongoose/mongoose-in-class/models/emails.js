var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var emails = new Schema({
    sender: String,
    recipients: [],
    cc: [],
    text: String,
    mid: String,
    fpath: String,
    bcc: [],
    to: [],
    replyto: Schema.Types.Mixed,
    date: Date,
    folder: String,
    subject: String

});

module.exports = mongoose.model('emails', emails);
