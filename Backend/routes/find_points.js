var MongoClient = require('mongodb').MongoClient
    ,assert = require('assert');
var url = "mongodb://localhost:27017/";



// format for geoJSON
// loc : { type: "Point", coordinates: [ -73.97, 40.77 ] },



exports.geoindexing = async (req,res) => {

    // Applying 2dshpere indexing on collections

    const collectionsList = ['farmer', 'warehousemanager', 'logistic', 'buyer', 'acfarmerwarehouseobj'];

    // const collectionsList = ['farmer'];

    for(coll of collectionsList){
      try{
        let verdict =await promisegeo(coll);
        console.log(verdict);
      }catch(err){
        console.log(err);
      }
    }
    res.json("done");
}

promisegeo = () => {
  return new Promise((resolve,reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("appdb");
      console.log(coll);
      dbo.collection(coll).createIndex({loc:'2dsphere'}, function(err, res) {
          if (!err){
              resolve("2dsphere index created for : ",coll);
          }
          else{
              reject("Error while creating 2dindex");
          }
          db.close();
      });
    });
  })
}


//HERE IS SUCCESS!

exports.findpoints = (req,res) => {

    // Needed who is querying for whom
    let centerpoint = req.body.centerpoint;
    let who = req.body.who;
    let whom = req.body.whom;

    console.log("whom : ", whom);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("appdb");
        dbo.collection('farmer').find(
            { 'loc':
              { $near :
                { $geometry:
                  { type: "Point",  coordinates: [ centerpoint.longitude, centerpoint.latitude ] },
                }
              }
            }
          ).toArray(function(err, docs) {
            if(err){
                console.log(err);
                res.status(400).json({message : "Internal Server Error!"})
            }
            else if(docs==undefined || docs==null){
                res.json("Empty");
                console.log("Nothing Found");
            }else{
                console.log("Found the following records");
                console.log(docs);
                res.status(200).json(docs);
            }


          });
        db.close();
    });
}



// IN app use
exports.findpointsfunc = (centerpoint,whom)=>{

    return new Promise( (resolve,reject) => {

            // console.log("helllllal");
            console.log("input:",centerpoint.whom);

            // Needed who is querying for whom
            console.log(centerpoint);
            // let whom = .whom;

            // console.log("whom : ", whom);

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("appdb");
                dbo.collection(centerpoint.whom).find(
                    { 'loc':
                      { $near :
                        { $geometry:
                          { type: "Point",  coordinates: [ centerpoint.longitude, centerpoint.latitude ] },
                        }
                      }
                    }
                  ).toArray(function(err, docs) {
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    else if(docs==undefined || docs==null){
                        console.log("Nothing Found");
                    }else{
                        console.log("Found the following records");
                        console.log(docs);
                        resolve(docs);
                    }


                  });
                db.close();
            });

    })
}



// THIS IS THE SAVIOR

// collection.find(
// 	{ 'address.coord':
// 	  { $near :
// 	    { $geometry:
// 	      { type: "Point",  coordinates: [ -73.9667, 40.78 ] },
// 	        $maxDistance: 1000
// 	    }
// 	  }
// 	}
//   ).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs);
//     callback(docs);
//   });
// }
