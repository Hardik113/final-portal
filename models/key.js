var mongoose = require('mongoose');

var keysSchema = mongoose.Schema({
  keys:[
    {
      key:{
        type:String,
      },
      count:{
        type:Number,
      }
    }
  ]
},
{
  collection : 'keys'
});

var keys = module.exports = mongoose.model('keys', keysSchema);
