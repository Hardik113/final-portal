var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');

participant = require('./models/participant');

var  url = "mongodb://admin:qwerty12345@ds137530.mlab.com:37530/workshoponar";

var collectionName = 'keys';

var Details = require('./config');

mongoose.connect(url);

var keys = mongoose.model('keys', {
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
collectionName);

var db = mongoose.connection;

var app = express();

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.send("Admin Portal for WAR registration portal");
});

app.get('/form', function(req, res){
	res.render('form.ejs');
});




app.post('/send',urlencodedParser ,function(req, res){

  var keyValid = false;
  var key = req.body.key;
  var keyArray = key.split("");
  if(keyArray.length == 6 && keyArray[0]=="A" && keyArray[1]=="d" && keyArray[2]=="g" && keyArray[3]<=1 && keyArray[4]<=9 && keyArray[5]<=9 ){


  keys.findOneAndUpdate({'keys.key':key},
              { $inc : { "keys.$.count" : 1 } },
              function(err, doc){
                if(err){
                  console.log(err);
                }
                keyValid = true;
              });


	var participantToAdd = new participant({
		name:req.body.full_name,
		regno:req.body.regno,
		gender:req.body.gender,
		mobile:req.body.mob,
		email:req.body.email,
		room:req.body.room,
    key:req.body.key
	});

	participantToAdd.save(function(err) {
			if(err) {
					console.log(err);
			} else {
					console.log('success');
			}

	});

  var transporter = nodemailer.createTransport({
  		service: 'Gmail',
  		auth: {
  			user: Details.email,
  			pass: Details.pass
  		}
  	});

  	var mail = req.body.email;

  	var toSend = 'Congratulations on successfully completing your registration for Workshop on Augmented Reality(WAR) !' +
  	'\n Name: '+ req.body.full_name +
  	'\n Registration Number: ' + req.body.regno +
  	'\n Gender: ' + req.body.gender +
  	'\n Email id: ' + req.body.email +
  	'\n Mobile Number: ' + req.body.mob +
  	'\n Room Number: ' + req.body.room ;

  	var mailOptions = {
  		from: Details.email,
  		to: mail,
  		subject: 'WAR Registration',
  		text : toSend
  	};

  	transporter.sendMail(mailOptions, function(error, info){
  		if(error){
          console.log(error);
          res.json({error});
      }else{
          console.log('Message sent:');
          res.json({info});
      }
  	});

}
else{
  res.send("Invalid key");
}

});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
