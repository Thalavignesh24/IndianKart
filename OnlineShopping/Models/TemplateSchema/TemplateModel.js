const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/IndianKart");

const Template = mongoose.Schema({

    FileName:
    {
        type: String,
        required: true
    },
    EmailSubject:
    {
        type: String,
        required: true
    },
    EmailType:
    {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let dbs = mongoose.model('templates', Template);

module.exports = dbs;