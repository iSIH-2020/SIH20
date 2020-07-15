

var MongoClient = require('mongodb').MongoClient;
// async = require('async');
var await = require("await")
var async = require("async")

var url = "mongodb://localhost:27017/";
var id;
var Ob = require('mongodb').ObjectID;
global.reqid;











//buyer signup
exports.bsign= function(req,res){

var post = req.body;
var fname = post.fname;
var lname = post.lname;
var contact = post.contact;
var address = post.address;
var password = post.password;
var quantity =null;

let coordinates = req.body.address.coordinates

//location object.
let loc = { type: "Point", coordinates: [parseFloat(coordinates.longitude), parseFloat(coordinates.latitude)]};


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("appdb");
   var myobj = { fname:fname,lname:lname,contact:contact,address:address,password:password,loc:loc,quantity:quantity}; // fname: fname,lname: lname ,
   dbo.collection("buyer").insertOne(myobj, function(err, res) {
     if (err) throw err;
   console.log("1 document inserted");
   db.close();
});

});


res.send(200);





}















//farmer login
exports.blogin = function(req,res){
  var sess = req.session;

  if(req.method == "POST"){
    console.log("IN");

     var post  = req.body;
     console.log(post);
    var contact = post.contact;
    var password = post.password;



      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("appdb");
        /*Return only the documents with the address "Park Lane 38":*/
        var query = { $and: [ {contact: contact},{password: password} ] };
        dbo.collection("buyer").find(query).toArray(function(err, result) {
          if (err) throw err;
        console.log(result[0]._id);

        //  id = result[0]._id;
         res.send(result[0]._id).status(200);
          db.close();
        });
      });
}
}










//buyer request to farmer
exports.breqf = function(req,res){

var post = req.body;

//var tid = {[fid,post.fid],[wid,post.wid]};
//console.log(tid);
// var fname = post.fname;
// var lname = post.lname;
var bid = post.bid;
var fid = post.fid;
var quantity = post.quantity;
var rate = post.rate;
var croptyp = post.croptyp;
var date= post.date;
var status =post.status;
var lpstatus = post.lpstatus;
global.notmyobj;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("appdb");
   var myobj = { bid:bid,fid:fid,date:date,quantity:quantity,rate:rate,croptyp:croptyp,status:status,lpstatus:lpstatus}; // fname: fname,lname: lname ,
   dbo.collection("buyerfarmerrq").insertOne(myobj, function(err, res) {
     if (err) throw err;
   console.log("1 document inserted");
    reqid = res.ops[0]._id;
    update1(fid,bid,reqid);
   db.close();
});

});
//       MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("appdb");
//         var query = { bid:bid,fid:fid,date:date,quantity:quantity,rate:rate,croptyp:croptyp,status:status};
//         dbo.collection("buyerfarmerrq").find(query).toArray(function(err, result) {
//           if (err) throw err;
//           console.log(result[0]._id);
//           reqid = result[0]._id;
//           console.log(result[0]);
//              update1();
//              db.close();
//       });
//
// });



}


function update1(fid,bid,reqid){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

  //  console.log(tid[fid]+"yo");
  console.log(reqid);

    var myquery = { _id:Ob(fid)};
    var newvalues = { $push: {increqid:reqid}};
   dbo.collection("farmer").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("1 document updated");
     db.close();
   });
  });



  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

  //  console.log(tid[fid]+"yo");
  //console.log(notmyobj);

    var myquery = { _id:Ob(bid)};
    var newvalues = { $push: {reqid:reqid}};
   dbo.collection("buyer").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("1 document updated");
     db.close();
   });
  });



}









//pull all farmerss
exports.pullf = function(req,res){


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
    // var query = { bid:bid,fid:fid,date:date,quantity:quantity,rate:rate,croptyp:croptyp,status:status};
    dbo.collection("farmer").find().toArray(function(err, result) {
      if (err) throw err;
        res.status(200).send(result);
         db.close();
  });

});
}











//buyer to farmer request REJECT
exports.bcr = function(req,res){

var post = req.body;

//var tid = {[fid,post.fid],[wid,post.wid]};
//console.log(tid);
global.rid = req.params._id;
global.fid = post.fid;
global.bid = post.bid;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("appdb");
   var myquery = { _id:Ob(rid)};
   dbo.collection("buyerfarmerrq").deleteOne(myquery, function(err, res) {
     if (err) throw err;
   console.log("1 document inserted");
   delete2();
   db.close();
});

});


}


function delete2(){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

  //  console.log(tid[fid]+"yo");
  // console.log(reqid);

    var myquery = { _id:Ob(fid)};
    var newvalues = { $pull: {increqid:Ob(rid)}};
   dbo.collection("farmer").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("1 document updated");
     db.close();
   });
  });


  //
  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("appdb");
  //
  // //  console.log(tid[fid]+"yo");
  // // console.log(reqid);
  //
  //   var myquery = { _id:Ob(bid)};
  //   var newvalues = { $pull: {reqid:Ob(rid)}};
  //  dbo.collection("buyer").update(myquery, newvalues,{upsert:true}, function(err, res) {
  //    if (err) throw err;
  //    console.log("1 document updated");
  //    db.close();
  //  });
  // });



}

















//pull request buyer from buyer PENDING
function listreturnquerybp(rid){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");
      console.log("Inside of listreturn: "+rid);
      var query = { _id:Ob(rid),status:"pending"};
      dbo.collection("buyerfarmerrq").find(query).toArray(function(err, result) {
        if (err) throw err;
        resolve(result[0]);
      });
      db.close();
    });
  });
}

function fqueryb(id){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var query = { _id:Ob(id)};

      dbo.collection("buyer").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0].reqid);
        db.close();

      });
    });
  });
}

exports.pullbreqbp= async function(req,res){
  var r = [];
  var pushlist = [];
  var id = req.params._id;
  console.log("req.params.id: ",id);
  try{
    r = await fqueryb(id);
  }catch(err){
    console.log(err);
  }
  for(rid of r){
    var temp;
    try{
      temp = await listreturnquerybp(rid);
      pushlist.push(temp);

    }catch(err){
      console.log(err);
    }
  }
  console.log(pushlist);
  res.status(200).json(pushlist);
}













//pull request buyer from buyer ACCEPTED
function listreturnqueryba(rid){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");
      console.log("Inside of listreturn: "+rid);
      var query = { _id:Ob(rid),status:"accepted"};
      dbo.collection("buyerfarmerreq").find(query).toArray(function(err, result) {
        if (err) throw err;
        resolve(result[0]);
      });
      db.close();
    });
  });
}

function fqueryb(id){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var query = { _id:Ob(id)};

      dbo.collection("buyer").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0].reqid);
        db.close();

      });
    });
  });
}

exports.pullbreqba= async function(req,res){
  var r = [];
  var pushlist = [];
  var id = req.params._id;
  console.log("req.params.id: ",id);
  try{
    r = await fqueryb(id);
  }catch(err){
    console.log(err);
  }
  for(rid of r){
    var temp;
    try{
      temp = await listreturnqueryba(rid);
    }catch(err){
      console.log(err);
    }
    pushlist.push(temp);
  }
  console.log(pushlist);
  res.status(200).json(pushlist);
}
