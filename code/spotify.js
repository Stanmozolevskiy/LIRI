require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");


module.exports.spotifySong = title => {
    console.log('\n Your search is: ' + title);
    title = title || "I Want it That Way"
  
    spotify.search({
        type: 'track', 
        query: title
    },  (err, data) => {
        if(err){
            return console.log("Erroe occurred: " + err);
        }
        var results = data.tracks.items[0];
        // console.log results:
        console.log("Spotify This Song Results: ");
        console.log("===========================");
        console.log("Song Title: " + results.name);
        console.log(`Artist name:  ${results.album.artists[0].name}`);
        console.log(`Preview Url: ${results.preview_url}`);
        console.log(`Album Name: ${results.album.name}`);
        console.log("===========================");
        fs.appendFile('log.txt', (`\r\n =================== \r\n Song Title: ${results.name} 
        \r\n Artist Name: ${results.album.artists[0].name} \r\n Preview Url: ${results.preview_url} 
        \r\n Album Name: ${results.album.name} \r\n ======================`), function (error) {
            if (error) throw error;
        })
    })
}