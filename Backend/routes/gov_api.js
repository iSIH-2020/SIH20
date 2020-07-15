const express = require('express');
// U need to request module to use request-promise module
const rp = require('request-promise');

const govdata = {result:{}};

// This function makes the url dynamic
exports.getdata = (req, res) => {

    let api_key = 'api-key=579b464db66ec23bdd0000012f71f627d3ca4fac4963e4a1ffdc87ef';



    // at this point u need to check whether one of geolocation or state or district has to be given
    let geolocation = {
        state: 'Maharashtra', // temporary
        district: 'Pune',
    }

    // let geolocation = req.body.geolocation;

    let state = req.body.state;
    let district = req.body.district;
    let commodity = req.body.commodity;

    let limit = (req.body.limit) ? (req.body.limit) : '10';

    let filters ={};

    if(state){
        if(district){
            filters = {
                // state : (req.body.state) ? (req.body.state) : "Maharashtra",
                state : (state) ? (state) : geolocation.state,
                district : (district) ? (district) : geolocation.district,
                commodity : (commodity) ? (commodity) : null,
            };
        }
        else{
            if(commodity){
                filters = {
                    // state : (req.body.state) ? (req.body.state) : "Maharashtra",
                    state : (state) ? (state) : geolocation.state,
                    district : (district) ? (district) : null,
                    commodity : (commodity) ? (commodity) : null,
                };
            }else{
                filters = {
                    // state : (req.body.state) ? (req.body.state) : "Maharashtra",
                    state : (state) ? (state) : geolocation.state,
                    district : (district) ? (district) : null,
                    commodity : (commodity) ? (commodity) : null,
                };
            }
        }
    }
    else{
        if(district){
            filters = {
                // state : (req.body.state) ? (req.body.state) : "Maharashtra",
                state : (state) ? (state) : null,
                district : (district) ? (district) : geolocation.district,
                commodity : (commodity) ? (commodity) : null,
            };
        }else{
            if(commodity){
                filters = {
                    // state : (req.body.state) ? (req.body.state) : "Maharashtra",
                    state : (state) ? (state) : null,
                    district : (district) ? (district) : null,
                    commodity : (commodity) ? (commodity) : null,
                };
            }else{
                filters = {
                    // state : (req.body.state) ? (req.body.state) : "Maharashtra",
                    state : (state) ? (state) : geolocation.state,
                    district : (district) ? (district) : geolocation.district,
                    commodity : (commodity) ? (commodity) : null,
                };
            }

        }

    }


    let filter_string ='';


    for(let key in filters){
        console.log(filters[key]);
        if(filters[key]){
            // filter_string += "&filters["+JSON.stringify(key)+"]="+filters[key];
            filter_string += "&filters["+key+"]="+filters[key];
        }
    }

    console.log("this is filter_string: "+filter_string);

    let options = {
        uri:
        "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?"
        + api_key +
        "&format=json"+
        "&offset=0" +
        "&limit=" + limit +
        filter_string,

        hearders: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    rp(options)
        .then(result => {
            govdata[result]=result;
            console.log(govdata[result]);
            res.status(200).json(govdata[result].records);
        })
        .catch((err) => {
            console.log(err);
            res.json({message : "server error"});
        });

};


// db.farmer.insert( {
//     contact: "0909090909",
//     password: "ad",
//     location: { type: "Point", coordinates: [ -7.97, 4.77 ] }
// });

// db.farmer.find(
//     {
//       loc:
//         { $near:
//            {
//              $geometry: { type: "Point",  coordinates: [ -7.0, 4.0 ] }
//            }
//         }
//     }
//  );
