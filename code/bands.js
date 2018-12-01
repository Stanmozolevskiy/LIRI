require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Bands = require("bandsintown-events");
var bands = new Bands(keys.bandsInTown);
var moment = require("moment");
var DATE_FORMAT = 'YYYY-MM-DD';
var fs = require("fs");

module.exports.getConcerts = (artist) => {

    var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${bands}`;

    request(url,(error, response, events) => {
        if(error && response.statusCode === 200){
            console.log("Error Occurred:  + ${error}");
        }
        let eventData = JSON.parse(events);
        //loops through all the venues outputting each
        let eventLen = eventData.length;
        for (let i = 0; i < eventLen; i++) {
            console.log("")
            console.log("|-----------------" + artist + "-----------------|");
            console.log('\t\t' + eventData[i].venue.name);
            console.log('\t\t' + eventData[i].venue.city + ", " + eventData[i].venue.region);
            console.log('\t\t' + moment(eventData[i].datetime).format(DATE_FORMAT));
            console.log("=========================================");
            console.log('\n');
        }
    });
};