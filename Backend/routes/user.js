
var MongoClient = require('mongodb').MongoClient;
// async = require('async');
var await = require("await")
var async = require("async")

var url = "mongodb://localhost:27017/";
var id;
var Ob = require('mongodb').ObjectID;
global.reqid;


// exports.test = function(req,res){
//
//   MongoClient.connect(url, function(err, db) {
//     var t;
//     if (err) throw err;
//     var dbo = db.db("appdb");
//     async.parallel([
//         function(callback){
//           t =2;
//           callback();
//         },
//         function(callback){
//           console.log(t+ "le lavde");
//         },
//     ])
//   });
// }



exports.l = function(req, res){
  var Request = require("request");
  var json;
  Request.get("https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000012f71f627d3ca4fac4963e4a1ffdc87ef&format=json&state=Maharashtra&offset=0&limit=96&filters[state]=Maharashtra", (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
    //  console.dir(JSON.parse(body));
        json = JSON.parse(body);
          res.send(json.records);
        //  console.log(json.records);
  });

}
