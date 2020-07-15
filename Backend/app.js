var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , farmer = require('./routes/farmer')
  , buyer = require('./routes/buyer')
  , warehouse = require('./routes/warehouse')
  , gov_api = require('./routes/gov_api')
  , logistic = require('./routes/logistic')
  ,find_api = require('./routes/find_points')
  ,districts = require('./routes/govdistrict')
  , path = require('path');
//var methodOverride = require('method-override');
var app = express();





var bodyParser=require("body-parser");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/appdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("connected");
});



var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 12000000 }
}))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/fsign',farmer.fsign);//farmer signup
app.post('/flogin',farmer.flogin);//farmer login
app.post('/freqw',farmer.freqw);//farmer request warehouse
// app.post('/freqwd',farmer.freqwd);//delete the request
app.post('/arbreq', farmer.arb); // Accept - Reject Farmer Buyer request.
app.post('/allw',farmer.allw);//get all warehouses
app.post('/allw1',farmer.allw1);//get all warehouses

app.get('/pullfreqws/:_id',farmer.pullfreqws);//get all requests warehouse STORED
app.get('/pullfreqwpa/:_id',farmer.pullfreqwpa);//get all requests warehouse PENDING /APPROVED
app.get('/pullfreqba/:_id',farmer.pullfreqba);//get all requests buyer PENDING
app.get('/pullfreqbp/:_id',farmer.pullfreqbp);//get all requests buyer ACCEPTED
app.post('/rrwf',farmer.rrwf);//reject request by farmer and reduce


app.post('/wsign',warehouse.wsign);//signup for the warehouse
app.post('/wlogin',warehouse.wlogin);//login for warehouse
app.get('/pullwreqpa/:_id',warehouse.pullwreqpa);//get all requests warehouse PENDING/APPROVED
app.get('/pullwreqs/:_id',warehouse.pullwreqs);//get all requests warehouse STORED
app.post('/arw',warehouse.arw);//initial accept by warehouse
app.post('/arw1',warehouse.arw1);//final accept by warehouse
app.post('/rrw',warehouse.rrw);//reject request by farmer and reduce


app.post('/bsign',buyer.bsign);//buyer signin
app.post('/blogin',buyer.blogin);//buyer login
app.get('/pullf',buyer.pullf);//pull all farmers
app.post('/breqf',buyer.breqf);//cancel request from the buyer side
app.post('/bcr/:_id',buyer.bcr);//cancel request from the buyer side
app.get('/pullbreqba/:_id',buyer.pullbreqba);//get all requests buyer accepted
app.get('/pullbreqbp/:_id',buyer.pullbreqbp);//get all requests buyer PENDING




app.post('/lsign', logistic.lsign);// Signup for logistics Provider.
app.post('/freqlup', logistic.freqlup); // Updating status from logistic provider.
app.post('/freql', logistic.freql); // Creating request when first send by farmer.
app.post('/assignprovider', logistic.assignprovider); // When farmer selects the warehouse from which to pickup.


app.post('/govdata', gov_api.getdata); // Government Data api.
app.post('/findpoints', find_api.findpoints); // Nearest point api.


app.get('/geoindexing', find_api.geoindexing); // geoindexing api.



// app.get('/districts', districts.districts); //districts
app.get('/getstates', districts.getstates);
app.post('/getdistricts', districts.getdistricts);


//app.get('/test/:_id', user.test);
app.get('/lo', user.l);
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');





app.listen(8080)
