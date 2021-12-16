const mongoose = require('mongoose');

const trip = new mongoose.Schema({
    name: {type:String},
    completed: {type:Boolean},
    participants: {type:Array},
    events: {type:Array},
    budget: {type:Array},
    home: {type:String},
    destination: {type:String},
    preferances: {type:Object},
})


module.exports = mongoose.model('trips', trip);