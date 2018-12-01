require("dotenv").config(); 
var  Spotify = require("node-spotify-api");
var  Bands = require("bandsintown-events");
var  keys = require("./keys");
var  spotify = new Spotify(keys.spotify);
var  bands = new Bands(keys.bandsInTown);
var  fs = require("fs");
var  request = require("request");
var  searchSpotify = require("./spotify.js");
var  searchOMDB = require("./omdb.js");
var  searchBands = require("./bands.js");
var moment = require('moment');
var inquirer = require("inquirer");

// INQUIRER PART
var choices = [
    {
        type: 'list',
        name: 'choise',
        message: 'Waht would you like to search?',
        choices: [
			'Song',
			'Movie',
			'Music concerts    /has to be existing consert'
            ]
	},]
	inquirer.prompt(choices).then(answerOne => {
		let imput = answerOne.choise
		var questions = [
			{
				type: 'input',
				name: 'userChoise',
				message: "What is the name of it???",
			},
		] 
		inquirer.prompt(questions).then(answers => {
				let arg = answers.userChoise;
				// console.log(answers.userChoise);
				// console.log(imput)
				Newsearch(imput, arg)
		})

	})

	function Newsearch(input, arg) {

		if (input === "Music concerts    /has to be existing consert"){
			searchBands.getConcerts(arg)
		}
		else if(input === "Song") {
			searchSpotify.spotifySong(arg)
		}
		else if (input === "Movie"){
			searchOMDB.omdbMovie(arg)
		}
	}
