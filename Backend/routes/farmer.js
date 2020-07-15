
var MongoClient = require('mongodb').MongoClient;
// async = require('async');
var await = require("await")
var async = require("async")

var url = "mongodb://localhost:27017/";
var id;
var Ob = require('mongodb').ObjectID;
global.reqid;











//farmer login
exports.flogin = function(req,res){
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
        dbo.collection("farmer").find(query).toArray(function(err, result) {
          if (err) throw err;
        console.log(result[0]._id);

        //  id = result[0]._id;
         res.send(result[0]._id).status(200);
          db.close();
        });
      });
}
}













//farmer signin
exports.fsign = function(req, res){
   var message = '';
   var sess = req.session;

   if(req.method == "POST"){
     console.log("IN");

        var post  = req.body;
        console.log(post);
       var fname= post.fname;
       var lname = post.lname;
       var contact = post.contact;
       var address = post.address;
       var password = post.password;
       var tycrop  = post.tycrop;
       var bankacc = post.bankacc;
       var aadhar = post.aadhar;
       var reqid = [];
       var increqid = [];
       let coordinates = post.address.coordinates
      let loc = { type: "Point", coordinates: [parseFloat(coordinates.longitude), parseFloat(coordinates.latitude)]};

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
    var myobj = { contact: contact ,password:password,fname:fname,lname:lname,address:address,tycrop:tycrop,bankacc:bankacc,aadhar:aadhar,reqid:reqid,increqid:increqid,loc:loc}; // fname: fname,lname: lname ,
     dbo.collection("farmer").insertOne(myobj, function(err, res) {
       if (err) throw err;
       console.log("meow");
       db.close();
     });
  });
   res.send({implement:"farmer"}).status();

}
}













//farmer req to warehouse
exports.freqw = function(req,res){

var post = req.body;

//var tid = {[fid,post.fid],[wid,post.wid]};
//console.log(tid);
global.fid = post.fid;
global.wid = post.wid;
var quantity = post.quantity;
var duration = post.duration;
var croptyp = post.croptyp;
var date= post.date;
var status =post.status;
global.notmyobj;

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  var dbo = db.db("appdb");
   var myobj = { fid:fid,wid:wid,date:date,quantity:quantity,duration:duration,croptyp:croptyp,status:status}; // fname: fname,lname: lname ,
   dbo.collection("farmerwarehouserq").insertOne(myobj,async function(err, res) {
     if (err) throw err;
   console.log("1 document inserted");
   reqid = res.ops[0]._id;
   console.log(reqid+"yipeeee");
   try{
     var j = await pull(wid);
      update(j);
   }catch(err){
     console.log(err);
   }


   db.close();
});

});
//       MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("appdb");
//         var query = { fid:fid,wid:wid,quantity:quantity,duration:duration,croptyp:croptyp,status:status};
//         dbo.collection("farmerwarehouserq").find(query).toArray(function(err, result) {
//           if (err) throw err;
//           console.log(result[0]._id);
//           reqid = result[0]._id;
//           console.log(result[0]);
//              update();
//              db.close();
//       });
//
// });

res.sratus(200);

}


function update(j){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

  //  console.log(tid[fid]+"yo");
  console.log(reqid);

    var myquery = { _id:Ob(fid)};
    var newvalues = { $push: {reqid:reqid}};
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
//  console.log(notmyobj);

    var myquery = { _id:Ob(wid)};
    var newvalues = { $set: {increqid:reqid}};
   dbo.collection("warehousemanager").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("1 document updated");
     db.close();
   });
  });



  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

  //  console.log(tid[fid]+"yo");
//  console.log(notmyobj);

    var myquery = { _id:Ob(reqid)};
    var newvalues = { $set: {"wname":j.wname,"address":j.address,"contact":j.contact}};
   dbo.collection("farmerwarehouserq").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("1 document updated");
     db.close();
   });
  });




}



function pull(wid){

  return new Promise(function(resolve,reject){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
    /*Return only the documents with the address "Park Lane 38":*/
    var query = {_id:Ob(wid)};
    dbo.collection("warehousemanager").find(query).toArray(function(err, result) {
      if (err) throw err;
    console.log(result[0]._id);

    //  id = result[0]._id;
  //   res.send(result[0]._id).status(200);
  resolve(result[0]);
      db.close();
    });
  });

});
}










//farmer req to warehouse DELETE
exports.freqwd = function(req,res){

var post = req.body;

//var tid = {[fid,post.fid],[wid,post.wid]};
//console.log(tid);
global.rid = post._id;
global.fid = post.fid;
global.wid = post.wid;

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


}


function delete1(){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

  //  console.log(tid[fid]+"yo");
  // console.log(reqid);

    var myquery = { _id:Ob(fid)};
    var newvalues = { $pull: {reqid:Ob(rid)}};
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
  //   var myquery = { _id:Ob(wid)};
  //   var newvalues = { $pull: {increqid:Ob(rid)}};
  //  dbo.collection("warehousemanager").update(myquery, newvalues,{upsert:true}, function(err, res) {
  //    if (err) throw err;
  //    console.log("1 document updated");
  //    db.close();
  //  });
  // });



}














//delete by warehouse also reduce value

exports.rrwf = async function(req,res){

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
















//pull request farmer from buyer PENDING
function listreturnquerybp(rid){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");
      console.log("Inside of listreturn: "+rid);
      var query = { _id:Ob(rid),status:"pending"};
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

      dbo.collection("farmer").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0].increqid);
        db.close();

      });
    });
  });
}

exports.pullfreqbp= async function(req,res){
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
    }catch(err){
      console.log(err);
    }
    pushlist.push(temp);
  }
  console.log(pushlist);
  res.status(200).json(pushlist);
}













//pull request farmer from buyer ACCEPTED
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

      dbo.collection("farmer").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0].increqid);
        db.close();

      });
    });
  });
}

exports.pullfreqba= async function(req,res){
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















//pull request farmer for warehouse STORED
function listreturnqueryws(rid){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");
      console.log("Inside of listreturn: "+rid);
      var query = { _id:Ob(rid),status:"stored"};
      dbo.collection("farmerwarehouserq").find(query).toArray(function(err, result) {
        if (err) throw err;
        resolve(result[0]);
      });
      db.close();
    });
  });
}

function fqueryw(id){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var query = { _id:Ob(id)};

      dbo.collection("farmer").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0].reqid);
        db.close();

      });
    });
  });
}

exports.pullfreqws = async function(req,res){
  var r = [];
  var pushlist = [];
  var id = req.params._id;
  console.log("req.params.id: ",id);
  try{
    r = await fqueryw(id);
  }catch(err){
    console.log(err);
  }
  for(rid of r){
    var temp;
    try{
      temp = await listreturnqueryws(rid);
    }catch(err){
      console.log(err);
    }
    pushlist.push(temp);
  }
  console.log(pushlist);
  res.status(200).json(pushlist);
}














//pull request farmer for warehouse pending and approved
function listreturnquerywpa(rid){
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

function fqueryw(id){
  return new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");

      var query = { _id:Ob(id)};

      dbo.collection("farmer").find(query).toArray(function(err, result) {

        if (err) throw err;
        resolve(result[0].reqid);
        db.close();

      });
    });
  });
}

exports.pullfreqwpa = async function(req,res){
  var r = [];
  var pushlist = [];
  var id = req.params._id;
  console.log("req.params.id: ",id);
  try{
    r = await fqueryw(id);
  }catch(err){
    console.log(err);
  }
  for(rid of r){
    var temp;
    try{
      temp = await listreturnquerywpa(rid);
    }catch(err){
      console.log(err);
    }
    pushlist.push(temp);
  }
  console.log(pushlist);
  res.status(200).json(pushlist);
}














//
// //buyer's proposal accept by the farmer
//
// exports.fab =  function(req,res){
//   var r = [];
//   var pushlist = [];
//   var id = req.params._id;
// //  var ar = req.params._ar;
//   console.log("req.params.id: ",id);
// //   console.log("req.params.ar: ",ar);
//
//
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("appdb");
//
//     var myquery = { _id:Ob(id)};
//     var newvalues = { $set: {status:"accepted"}};
//    dbo.collection("buyerfarmerrq").update(myquery, newvalues,{upsert:true}, function(err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      res.status(200);
//      db.close();
//    });
//   });
//
//
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// //buyer to farmer request REJECT
// exports.frb = function(req,res){
//
// var post = req.body;
// //var tid = {[fid,post.fid],[wid,post.wid]};
// //console.log(tid);
// global.rid = req.params._id;
// global.fid = post.fid;
// global.bid = post.bid;
//
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("appdb");
//    var myquery = { _id:Ob(rid)};
//    dbo.collection("buyerfarmerrq").deleteOne(myquery, function(err, res) {
//      if (err) throw err;
//    console.log("1 document inserted");
//    delete2();
//    db.close();
// });
//
// });
//
//
// }
//
//
// function delete2(){
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("appdb");
//
//   //  console.log(tid[fid]+"yo");
//   // console.log(reqid);
//
//     var myquery = { _id:Ob(fid)};
//     var newvalues = { $pull: {increqid:Ob(rid)}};
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
//   //   var myquery = { _id:Ob(bid)};
//   //   var newvalues = { $pull: {reqid:Ob(rid)}};
//   //  dbo.collection("buyer").update(myquery, newvalues,{upsert:true}, function(err, res) {
//   //    if (err) throw err;
//   //    console.log("1 document updated");
//   //    db.close();
//   //  });
//   // });
//
//
//
// }












// dd accept or reject by the farmer

exports.arb =  function(req,res){

  var farmer_id;
  var buyer_id;

  var r = [];
  var pushlist = [];
  var id = req.body._id;
  var ar = req.body._ar;
  console.log("req id: ",id);
  console.log("req ar: ",ar);


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");

    var myquery = { _id:Ob(id)};
    var newvalues = { $set: {status:ar}};

    dbo.collection("buyerfarmerrq").update(myquery, newvalues,{upsert:true}, function(err, resul) {
      if (err) throw err;
      console.log("buyerfarmer request updated");
      // resul.json("Updated!");
      db.close();
    });

    if(ar == 'accepted'){

      dbo.collection("buyerfarmerrq").findOne(myquery, async function(err, result) {
        if (err) throw err;
        if(!err){
          var loc;
          farmer_id = result.fid;
          buyer_id = result.bid;
          console.log("THIS IS BUYERID : " ,buyer_id);
          try{
            loc = await findbuyerPromise(buyer_id);
          }catch(err){
            console.log(err);
          }

          if(loc){
            var centerpoint = {
              longitude : loc[0],
              latitude : loc[1],
              whom : 'acfarmerwarehouseobj'
            }
            try{

              pushlist = await findpointsPromise(centerpoint);
              res.json(pushlist);
            }catch(err){
              console.log(err);
            }
          }else{
            console.log("loc is",loc)
          }
        }
        db.close();
      });
    }
    else{
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
  });
}

findbuyerPromise = (buyer_id) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {

      var myquery = { _id:Ob(buyer_id)};

      if (err) throw err;
      var dbo = db.db("appdb");
      dbo.collection('buyer').find(myquery).toArray(function(err, result) {

      if (err) throw err;
      if(!err && result[0]){
        console.log(result[0].loc.coordinates + "buyer object");
        resolve(result[0].loc.coordinates);
      }
      else if(result[0]==null){
        reject("null value");
      }else{
        reject(err);
      }
      db.close();
      });
    });
  })
}

// Findpoints for particular collection.
findpointsPromise = (centerpoint) => {
  return new Promise(async (resolve, reject) => {
    try{
      var result1;
      console.log(" sdsdsdadadadadasdasdasdsadasdad")
      console.log("In promise : ", centerpoint);
      result1 = await findpointsfunc(centerpoint);

      resolve(result1);
    }catch(err){
      reject(err);
    }
  })
}


function delete2(){
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("appdb");

  var myquery = { _id:Ob(fid)};
  var newvalues = { $pull: {increqid:rid}};
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
  // console.log(reqid);

    var myquery = { _id:Ob(bid)};
    var newvalues = { $pull: {reqid:Ob(rid)}};
   dbo.collection("buyer").update(myquery, newvalues,{upsert:true}, function(err, res) {
     if (err) throw err;
     console.log("1 document updated");
     db.close();
   });
  });
}














//ALL ware houses
exports.allw= async function(req,res){

  let fid = req.body.fid



      try{
        loc = await findPromise(fid);
      }catch(err){
        console.log(err);
      }

      if(loc){
        var centerpoint = {
          longitude : loc[0],
          latitude : loc[1],
          whom : 'warehousemanager'
        }
        try{

          pushlist = await findpointsPromise(centerpoint);
          console.log(pushlist);
          res.json(pushlist);
        }catch(err){
          console.log(err);
        }
      }else{
        console.log("loc is",loc)
      }



}
findPromise = (fid) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {

      var myquery = { _id:Ob(fid)};

      if (err) throw err;
      var dbo = db.db("appdb");
      dbo.collection('farmer').find(myquery).toArray(function(err, result) {

      if (err) throw err;
      if(!err && result[0]){
        console.log(result[0].loc.coordinates + "farmer object");
        resolve(result[0].loc.coordinates);
      }
      else if(result[0]==null){
        reject("null value");
      }else{
        reject(err);
      }
      db.close();
      });
    });
  })
}

// Findpoints for particular collection.
findpointsPromise = (centerpoint) => {
  return new Promise(async (resolve, reject) => {
    try{
      var result1;
      console.log(" sdsdsdadadadadasdasdasdsadasdad")
      console.log("In promise : ", centerpoint);
      result1 = await findpointsfunc(centerpoint);

      resolve(result1);
    }catch(err){
      reject(err);
    }
  })
}















//ALL ware houses
exports.allw1= async function(req,res){

  let fid = req.body.fid



      try{
        loc = await findPromise(fid);
      }catch(err){
        console.log(err);
      }

      if(loc){
        var centerpoint = {
          longitude : loc[0],
          latitude : loc[1],
          whom : 'warehousemanager'
        }
        try{

          pushlist = await findpointsPromise(centerpoint);
          console.log(pushlist);
          res.json(pushlist[0]);
        }catch(err){
          console.log(err);
        }
      }else{
        console.log("loc is",loc)
      }



}
findPromise = (fid) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {

      var myquery = { _id:Ob(fid)};

      if (err) throw err;
      var dbo = db.db("appdb");
      dbo.collection('farmer').find(myquery).toArray(function(err, result) {

      if (err) throw err;
      if(!err && result[0]){
        console.log(result[0].loc.coordinates + "farmer object");
        resolve(result[0].loc.coordinates);
      }
      else if(result[0]==null){
        reject("null value");
      }else{
        reject(err);
      }
      db.close();
      });
    });
  })
}

// Findpoints for particular collection.
findpointsPromise = (centerpoint) => {
  return new Promise(async (resolve, reject) => {
    try{
      var result1;
      console.log(" sdsdsdadadadadasdasdasdsadasdad")
      console.log("In promise : ", centerpoint);
      result1 = await findpointsfunc(centerpoint);

      resolve(result1);
    }catch(err){
      reject(err);
    }
  })
}
