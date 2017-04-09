var mongoose = require('mongoose');

//Participant Schema

var participantSchema = mongoose.Schema({
    name:{
      type: String,
    },
    regno:{
      type:String,
    },
    gender:{
      type:String,
    },
    mobile:{
      type:Number,
    },
    email:{
      type:String,
    },
    room:{
      type:String,
    },
    key:{
      type:String,
    }
});

var participant = module.exports = mongoose.model('participant', participantSchema);
