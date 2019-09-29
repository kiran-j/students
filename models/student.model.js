const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Name        : String,
    Gender      : String,
    Age         : Number,
    rollNo    : String,
    Branch    : String,
    College   : String
})

module.exports  = mongoose.model('Student',studentSchema);
