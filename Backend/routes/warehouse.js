var MongoClient = require('mongodb').MongoClient;
// async = require('async');
var await = require("await")
var async = require("async")

var url = "mongodb://localhost:27017/";
var id;
var Ob = require('mongodb').ObjectID;
global.reqid;

//252 ADD FUNTION






//warehouse signin
exports.wsign = function(req, res){
   var message = '';
   var sess = req.session;

   if(req.method == "POST"){
     console.log("IN");

      var post  = req.body;
      console.log(post);
      var fname = post.fname;
      var lname = post.lname;
      var wname = post.wname;
     var contact = post.contact;
     var address = post.address;
     var password = post.password;
     var stcap = post.stcap;
     var typ =post.typ;
     var coldst = post.coldst;
     var increqid = [];
     let coordinates = post.address.coordinates
    let loc = { type: "Point", coordinates: [parseFloat(coordinates.longitude), parseFloat(coordinates.latitude)]};
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
    var myobj = { contact: contact ,password:password,fname:fname,lnmae:lname,wname:wname,address:address,stcap:stcap,typ:typ,coldst:coldst,increqid:increqid,loc:loc}; // fname: fname,lname: lname ,
     dbo.collection("warehousemanager").insertOne(myobj, function(err, res) {
       if (err) throw err;
       console.log("1 document inserted");
       db.close();
     });
  });
   res.send({implement:"warehousemanager"});

}
}













//warehouse wlogin


exports.wlogin = function(req,res){
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
        dbo.collection("warehousemanager").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result[0]._id);
          id = result[0]._id;
          res.status(200).send({answer:result[0]})
          db.close();
        });
      });
}
}














//pull request warehouse for warehouse PENDING/APPROVED
function listreturnquerypa(rid){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");
      console.log("Inside of listreturn: "+rid);
      var query = { $and:[{$or:[{status:"pending"},{status:"approved"}]},{_id:Ob(rid)} ]};
      dbo.collection("farmerwarehouserq").find(query).toArray(function(err, result) {
        if (err) throw err;
        resolve(result[0]);
      });
      db.close();
    });
  });
}

function wquery(id){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var query = { _id:Ob(id)};

      dbo.collection("warehousemanager").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0].increqid);
        db.close();

      });
    });
  });
}

exports.pullwreqpa = async function(req,res){
  var r = [];
  var pushlist = [];
  var id = req.params._id;
  console.log("req.params.id: ",id);
  try{
    r = await wquery(id);
  }catch(err){
    console.log(err);
  }
  for(rid of r){
    var temp;
    try{
      temp = await listreturnquerypa(rid);
    }catch(err){
      console.log(err);
    }
    pushlist.push(temp);
  }
  console.log(pushlist);
  res.status(200).json(pushlist);
}











//pull request warehouse for warehouse STORED
function listreturnquerys(rid){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");
      console.log("Inside of listreturn: "+rid);
      var query = {_id:Ob(rid),status:"stored"};
      dbo.collection("farmerwarehouserq").find(query).toArray(function(err, result) {
        if (err) throw err;
        resolve(result[0]);
      });
      db.close();
    });
  });
}

function wquery(id){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var query = { _id:Ob(id)};

      dbo.collection("warehousemanager").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0].increqid);
        db.close();

      });
    });
  });
}

exports.pullwreqs= async function(req,res){
  var r = [];
  var pushlist = [];
  var id = req.params._id;
  console.log("req.params.id: ",id);
  try{
    r = await wquery(id);
  }catch(err){
    console.log(err);
  }
  for(rid of r){
    var temp;
    try{
      temp = await listreturnquerys(rid);
    }catch(err){
      console.log(err);
    }
    pushlist.push(temp);
  }
  console.log(pushlist);
  res.status(200).json(pushlist);
}














//accept  by the warehouse

exports.arw = async function(req,res){

  var r = [];
  var pushlist = [];
  var post= req.body;
  var rid = post._id;
  var wid = post.wid;
  var status = post.status;
  var tycrop = post.tycrop;
  var quantity = post.quantity;
  var ob;
  console.log("req.params.id: ",rid);
   console.log("req.params.ar: ",wid);
   try{

      ob = await f(wid);
   }catch(err){
     console.log(err);
   }
   try{

     var g = await kk(quantity,wid,tycrop,rid,ob);
   }catch(err){
     console.log(err);
   }
   console.log("my world");
   MongoClient.connect(url, async function(err, db) {
       if (err) throw err;
       var dbo = db.db("appdb");
       console.log("hello world");
       var myobjid = { _id:Ob(wid)};
       try{
         let myobj   =  await findwarehouse(myobjid, dbo);

         let upmyobj={};
         for(key in myobj){
           if(key=='_id'){
             continue;
           }
           else{
             upmyobj[key] = myobj[key];
           }
         }
           console.log("THis is upmyobj: ",upmyobj);
           dbo.collection("acfarmerwarehouseobj").insertOne(upmyobj, function(err, result) {
            if (err) throw err;
           console.log(" acfarmerwarehouseobj updated");

           if(!err){
             console.log("updated the acfarmerwarehouseid collection");
           }
           db.close();
           });

       }catch(error){
         console.log(error, " FROM findwarehouse");
       }


     });

  res.status(200);

}

function f(wid){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var query = { _id:Ob(wid)};

      dbo.collection("warehousemanager").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0]);
        db.close();

      });
    });
  });
}


function kk(quantity,wid,tycrop,rid,ob)
{

  return new Promise(function(resolve,reject){


    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

       for(i in ob.typ){
        if(ob.typ[i].produce == tycrop){
          var aval = ob.typ[i].pstorage-quantity;
      var myquery = { _id:Ob(wid),"typ.produce":tycrop};
      var newvalues = { $set: {"typ.$.astorage":aval}};
     dbo.collection("warehousemanager").update(myquery, newvalues,{upsert:true}, function(err, res) {
       if (err) throw err;
       console.log("AVALABILITY ADDED");
       resolve("yoyo");
       db.close();
     });
   }
   }

    });


    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var myquery = { _id:Ob(rid)};
      var newvalues = { $set: {status:"approved"}};
     dbo.collection("farmerwarehouserq").update(myquery, newvalues,{upsert:true}, function(err, res) {
       if (err) throw err;
       console.log("1 document updated");
      // res.status(200);
       db.close();
     });
    });


});


}





// find the warehouse object
findwarehouse = (myobjid, dbo) => {
  return new Promise((resolve,reject) => {


    dbo.collection("warehousemanager").findOne(myobjid, async function(error, result) {
      if(!error){
        console.log("Warehouse accepted object ", result);
        resolve(result);

      }
      else{
        reject(error);
      }

    });
  })
}








//accept after quality check

exports.arw1 =  function(req,res){
  var r = [];
  var pushlist = [];
  var id = req.params._id;
  var ar = req.params._ar;
  var rate = req.params._rate;
  console.log("req.params.id: ",id);
  console.log("req.params.ar: ",ar);
  console.log("req.params.rate: ",rate);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

    var myquery = { _id:Ob(id)};
    var newvalues = { $set: {status:ar,rate:rate}};
   dbo.collection("farmerwarehouserq").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("1 document updated");
     res.send(updated);
     db.close();
   });
  });


}














// //farmer req to warehouse DELETE
// exports.freqwd = function(req,res){
//
// var post = req.body;
//
// //var tid = {[fid,post.fid],[wid,post.wid]};
// //console.log(tid);
// global.rid = post._id;
// global.fid = post.fid;
// global.wid = post.wid;
//
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("appdb");
//    var myquery = { _id:Ob(rid)};
//    dbo.collection("farmerwarehouserq").deleteOne(myquery, function(err, res) {
//      if (err) throw err;
//    console.log("1 document inserted");
//    delete1();
//    db.close();
// });
//
// });
//
//
// }
//
//
// function delete1(){
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("appdb");
//
//   //  console.log(tid[fid]+"yo");
//   // console.log(reqid);
//
//     var myquery = { _id:Ob(fid)};
//     var newvalues = { $pull: {reqid:Ob(rid)}};
//    dbo.collection("farmer").update(myquery, newvalues,{upsert:true}, function(err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      db.close();
//    });
//   });
//
//
//   //
//   // MongoClient.connect(url, function(err, db) {
//   //   if (err) throw err;
//   //   var dbo = db.db("appdb");
//   //
//   // //  console.log(tid[fid]+"yo");
//   // // console.log(reqid);
//   //
//   //   var myquery = { _id:Ob(wid)};
//   //   var newvalues = { $pull: {increqid:Ob(rid)}};
//   //  dbo.collection("warehousemanager").update(myquery, newvalues,{upsert:true}, function(err, res) {
//   //    if (err) throw err;
//   //    console.log("1 document updated");
//   //    db.close();
//   //  });
//   // });
//
//
//
// }












//delete by warehouse also reduce value

exports.rrw = async function(req,res){

  var r = [];
  var pushlist = [];
  var post= req.body;
  var rid = post._id;
  var wid = post.wid;
  var fid = post.fid;
  var status = post.status;
  var tycrop = post.tycrop;
  var quantity = post.quantity;
  console.log("req.params.id: ",rid);
   console.log("req.params.ar: ",wid);
   if(status != "pending"){
   try{

     var ob = await f(wid);
   }catch(err){
     console.log(err);
   }

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

     for(i in ob.typ){
      if(ob.typ[i].produce == tycrop){
        var aval = ob.typ[i].pstorage+quantity;
    var myquery = { _id:Ob(wid),"typ.produce":tycrop};
    var newvalues = { $set: {"typ.$.astorage":aval}};
   dbo.collection("warehousemanager").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("AVALABILITY reverted");
     db.close();
   });
 }
 }

  });
}

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
     var myquery = { _id:Ob(rid)};
     dbo.collection("farmerwarehouserq").deleteOne(myquery, function(err, res) {
       if (err) throw err;
     console.log("1 document inserted");
     delete1();
     db.close();
  });

  });



  res.status(200);

}

function f(wid){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var query = { _id:Ob(wid)};

      dbo.collection("warehousemanager").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0]);
        db.close();

      });
    });
  });
}
