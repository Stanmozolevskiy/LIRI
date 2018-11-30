var request = require("request");
var fs = require("fs");

module.exports.omdbMovie = (movieName) => {
    movieName = movieName || "Mr. Nobody"; //default movie

    var omdb = `http://www.omdbapi.com/?t=${movieName}&plot=full&tomatoes=true&apikey=trilogy`

    // sending request to omdb
    request(omdb, (error, response, body)=> {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
           console.log("Movie Database Results:")
           console.log("==========================") 
           console.log(`Movie Title: ${data.Title}`);
           console.log(`Release Year: ${data.Year}`);
           console.log(`IMDB Rating: ${data.imdbRating}`);
           console.log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`);
           console.log(`Produced in: ${data.Country}`);
           console.log(`Spoken Language(s): ${data.Language}`);
           console.log(`Plot Summary: ${data.Plot}`);
           console.log(`Cast: ${data.Actors}`);
           console.log(`~~~~~~~~~~~~~~~~~~END~~~~~~~~~~~~~~~~~~~~`);
           fs.appendFile('log.txt', (`\r\n ========IMDB======== \r\n Movie Title: ${data.Title} \r\n Release Year: ${data.Year} 
           \r\n Rating: ${data.imdbRating} \r\n Rating: ${data.Ratings[1].Value} \r\n Country of origin: ${data.Country} \r\n 
           Language: ${data.Language} \r\n Plot: ${data.Plot} \r\n Actors: ${data.Actors} \r\n ================= \r\n`), function (error) {
            if (error) throw error;
           });
        }
    });
};
