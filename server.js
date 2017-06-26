var Model = require('./models/model.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require("morgan");

var app = express();

var db = "mongodb://localhost/mean_end_to_end";

mongoose.connect(db, function(err, response){
  if(err){
    console.log('Failed to conncet to ' + db);
  } else {
    console.log('Connected to ' + db);
  }
});

var router = express.Router();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//GET
router.get('/api/users', function(request, response){
  Model.find({}, function(err, users){
    if(err){
      reponse.status(404).send(err);
    }else{
      response.status(200).send(users)
    }
  })
});

router.post('/api/users', function(request, response){
  console.log(request.body);
  var model = new Model();
  model.name = request.body.name;
  model.age = request.body.age;
  model.save(function(err, user){
    if(err){
      response.status(500).send(err)
    } else {
      response.status(201).send(user)
    }
  })
});

app.use('/', router);

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
