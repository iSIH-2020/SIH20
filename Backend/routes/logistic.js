var findpointsfunc = require('./find_points').findpointsfunc;
var MongoClient = require('mongodb').MongoClient;
var await = require("await")
var async = require("async")

var url = "mongodb://localhost:27017/";
var Ob = require('mongodb').ObjectID;



exports.lsign = function(req, res){

    if(req.method == "POST"){
      console.log("IN");


       var post  = req.body;
       console.log(post);

       var address = post.address;
       let coordinates = post.address.coordinates;
       let loc = { type: "Point", coordinates: [parseFloat(coordinates.longitude), parseFloat(coordinates.latitude)]};

       var fname= post.fname;
      var lname = post.lname;
      var contact = post.contact;
      var coldst= post.coldst;
      var password = post.password;
    //   var tycrop  = post.tycrop;
    //  var bacnkacc = post.bankacc;
    // var aadhar = post.aadhar;


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("appdb");
        var myobj = { contact: contact ,password:password, loc:loc,fname:fname,lname:lname,coldst:coldst}; // fname: fname,lname: lname ,
        dbo.collection("logistic").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        });
        res.status(201).json({implemented:"logistic"});
    }
}



// updating status when logistic provider accepts pickup and farmer buyer request as well.
exports.freqlup = (req, res) => {

  var reqid = req.body.reqid
  var fbrqid = req.body.fbrqid; // request id stored in farmer-logistics request
  // var quantity = req.body.quantity;
  // var rate = req.body.rate;
  // var croptyp = req.body.croptyp;
  // var date= req.body.date;
  var status = req.body.status;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
    //  myobj = { bid:bid,fid:fid,date:date,quantity:quantity,rate:rate,croptyp:croptyp,status:status}; // fname: fname,lname: lname ,

    console.log("This is request id clicked on: ",reqid);

    var myquery = { _id:Ob(reqid)};
    var newvalues = { $set: {status:status}};
    dbo.collection("farmerlogisticrq").update(myquery, newvalues,{upsert:true}, function(err, res) {
      if (err) throw err;
      if(!err){
        console.log("request updated");
        var obj = {
          fbrqid:fbrqid,
          status:status
        }
        updatefb(obj);
      }
      db.close();
    });
    // Need to think about it.
    res.status(201).json("Request updated");
  });
}



// It is called when farmer accepts buyer request and selects the warehouse.
// farmer request to logistic.
// creating farmer logistics request.
exports.freql = (req, res) => {

  var id;
  var obj;

  console.log(req.body);
  var lid = req.body.lid;
  var fid = req.body.fid;
  var wid = req.body.wid;
  var fbrqid = req.body.fbrqid; // Request id of farmer-buyer request

  // var quantity = req.body.quantity;
  // var rate = req.body.rate;
  // var croptyp = req.body.croptyp;
  // var date= req.body.date;
  var status = req.body.status; // it will be pending at first.

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
    //  myobj = { bid:bid,fid:fid,date:date,quantity:quantity,rate:rate,croptyp:croptyp,status:status}; // fname: fname,lname: lname ,

    myobj = {lid:lid, fid:fid, wid:wid, fbrqid:fbrqid, status:status};
    dbo.collection("farmerlogisticrq").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      if(!err){
        obj = res.ops[0];
        id = obj._id;
        console.log("ist : ",obj);
        updatef(id);
        updatel(id);
        updatefb(obj);
        // Need to think about warehouse.
      }
      console.log("first ...");
      db.close();
    });
    res.status(201).json("Recorded response for farmer request to logistics provider");
  });
}


// updating farmer outgoing request.
function updatef(id,fid){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

    console.log("f:",id);

    var myquery = { _id:Ob(fid)};
    var newvalues = { $push: {lreqid:id}};
    dbo.collection("farmer").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("request inserted in farmer");
     db.close();
    });
  });
}


// updating logistic's incoming requests.
function updatel(id,lid){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");


      console.log(id);

      var myquery = { _id:Ob(lid)};
      var newvalues = { $push: {increqid:id}};
      dbo.collection("logistic").update(myquery, newvalues,{upsert:true}, function(err, res) {
       if (err) throw err;
       console.log("request inserted in logistics provider");
       db.close();
      });
    });
  }

// updating farmer-buyer request id.
function updatefb(obj){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
    var id  = obj.fbrqid;
    var status = obj.status;
    console.log("This is fbrqid :", id, " And status is : ", status);

    var myquery = { _id:Ob(id)};
    var newvalues = { $set: {lpstatus:status}};
    dbo.collection("buyerfarmerrq").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("farmer-buyer request updated");
     db.close();
    });
  });
}



// when farmer selects warehouse this api will be called.
exports.assignprovider = async (req,res) => {

    var r = [];
    var pushlist = [];
    var smallist = [];
    var wid = req.body.wid;
    // var fid = req.body.fid;
    let loc;
    // console.log("req id: ",id);

    var my_wid = { _id:Ob(wid)};

    try{
        loc = await findlocationPromise(my_wid);
        if(loc){
          var centerpoint = {
            longitude : loc[0],
            latitude : loc[1],
            whom : 'logistic'
          }
          try{
              pushlist = await findpointsPromise(centerpoint);
              // res.json(pushlist);
              smallist = pushlist.splice(0,5);
              // var obj = {
              //     lid: null,
              //     wid: wid,
              //     fid: fid
              // }

              // for(lp of smallist){
              //     obj.lid = lp._id;
              //     await this.freql(obj);
              // }

              res.status(200).json(smallist);

          }catch(err){
              console.log(err);
          }
      }else{
          console.log("loc is",loc)
      }
    }catch(err){
        console.log(err);
    }
}

findlocationPromise = (my_id) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, db) {

        // var myquery = { _id:Ob(my_id)};

        if (err) throw err;
        var dbo = db.db("appdb");
        dbo.collection('acfarmerwarehouseobj').findOne(my_id,function(err, result) {

        if (err) throw err;
        if(!err && result){
          console.log(result.loc.coordinates + "warehouse object");
          resolve(result.loc.coordinates);
        }
        else if(result==null){
          reject("null value");
        }else{
          reject(err);
        }
        db.close();
        });
      });
    })
}

findpointsPromise = (centerpoint) => {
    return new Promise(async (resolve, reject) => {
      try{
        var result1;
        console.log("In promise : ", centerpoint);
        result1 = await findpointsfunc(centerpoint);

        resolve(result1);
      }catch(err){
        reject(err);
      }
    })
}
