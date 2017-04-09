//Participant Schema
const mongoose = require('mongoose');

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
    }
});

var participant = module.exports = mongoose.model('participant', participantSchema);
