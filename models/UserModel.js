const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type:String},
    password: {type:String},
    friends: {type:Array},
    completedTrips: {type:Array},
    
})


module.exports = mongoose.model('user', user);