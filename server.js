/******************************************************************************
***
* ITE5315 – Project
* we declare that this assignment is our own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member Name: Uppala Vikas Student IDs: N01486527 Date: 07/12/2022
* Group member Name: Sarada Maddipatla Student IDs: N01486876 Date: 07/12/2022
******************************************************************************
***/

// importing all required modules
const url = require('url');
var express  = require('express');
var path = require('path');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
const exphbs = require('express-handlebars');
require('dotenv').config()
var index = require('./index');
var user = require('./models/user');
var database = require('./config/database')

var app = express();

// assigning port no
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(express.static(path.join(__dirname, 'public')));

// array for collecting user data for registration
const userdata=[];

// Intializing template engine
app.engine('.hbs', exphbs.engine({ 
	extname: '.hbs',runtimeOptions:{
		allowProtoPropertiesByDefault:true,
		allowProtoMethodsByDefault:true
	}
}));
app.set('view engine', 'hbs');
	
// function to connect to database
async function dbconnect() {
	var conResult = await index.intialize(database.url);
	if(conResult == true)
	{
		// starting the port
		app.listen(process.env.PORT);
		console.log("App Listening to Port : "+process.env.PORT)
		
	}
	else{
		// printing error while connecting to port
		console.log(conResult);
	}
}
dbconnect();

// Create a new Movie Record
app.post('/api/moviescreate', async function(req, res) {

	var data = {
		plot : req.body.plot,
		genres : req.body.genres,
		runtime: req.body.runtime,
    	metacritic:req.body.metacritic,
		cast : req.body.cast,
		poster:req.body.poster,
		num_mflix_comments : req.body.num_mflix_comments,
		title : req.body.title,
		fullplot : req.body.fullplot,
		languages: req.body.languages,
		countries : req.body.countries,
		released : req.body.released,
		writers: req.body.writers,
		directors : req.body.directors,
    	rated : req.body.rated,
		awards : {
			wins: req.body.wins,
			nominations: req.body.nominations,
			text: req.body.text
		},
		lastupdated:req.body.lastUpdated,
    	year:req.body.year,
		imdb:{
			rating: req.body.imdbrating,
			votes:req.body.imdbvotes,
        	id:req.body.imdbid
		},
		type: req.body.type,
		tomatoes:{
			website:req.body.website,
			viewer:{
				rating: req.body.viewerrating, 
				numReviews: req.body.viewernumReviews, 
				meter: req.body.viewermeter
			},
			dvd:req.body.dvd,
        	critic:{
				rating:req.body.criticrating,
				numReviews:req.body.criticnumReviews,
				meter:req.body.meter
        	},
			boxOffice:req.body.boxOffice,
			rotten:req.body.rotten,
			production:req.body.production,
			fresh:req.body.fresh
		}
	};
	var result = await index.addNewMovieData(data);
	await res.send(result); // send response
});

// fetch all movies records based on page no, page size and optional parameter title
app.get("/api/getallmovies", async (req, res, next) => {

	const queryObject = url.parse(req.url, true).query; // to parse url to string
	let { page, size, title } = queryObject; // assign query parameters to variables
	if (!page) {
		// Make the Default value one if page no is not mentioned.
		page = 1;
	}
	if (!size) {
		// Make the Default value one if page size is not mentioned.
		size = 1;
	}
	const limit = parseInt(size); // convertig string to integer
	
	var result =  await index.getAllMovies(page,limit,title);
	console.log(result);
	//await res.render('movieresult', {data: result});
	await res.send({
		page,
		size,
		Info: result
	});
});

// find a movie record using ID
app.get('/api/movies/:movie_id', async function(req, res) {
	let id = req.params.movie_id;
	var result = await index.getMovieById(id);
	await res.render('movieresult', {data:result});
	//await res.send(result);
});

// update a movie record using ID
app.put('/api/movies/:movie_id', async function(req, res) {
	// create mongose method to update an existing record into collection

	let id = req.params.movie_id;
	var data = {
		plot : req.body.plot,
		genres : req.body.genres,
		runtime: req.body.runtime,
    	metacritic:req.body.metacritic,
		cast : req.body.cast,
		poster:req.body.poster,
		num_mflix_comments : req.body.num_mflix_comments,
		title : req.body.title,
		fullplot : req.body.fullplot,
		languages: req.body.languages,
		countries : req.body.countries,
		released : req.body.released,
		writers: req.body.writers,
		directors : req.body.directors,
    	rated : req.body.rated,
		awards : {
			wins: req.body.wins,
			nominations: req.body.nominations,
			text: req.body.text
		},
		lastupdated:req.body.lastUpdated,
    	year:req.body.year,
		imdb:{
			rating: req.body.imdbrating,
			votes:req.body.imdbvotes,
        	id:req.body.imdbid
		},
		type: req.body.type,
		tomatoes:{
			website:req.body.website,
			viewer:{
				rating: req.body.viewerrating,
				numReviews: req.body.viewernumReviews,
				meter: req.body.viewermeter
			},
			dvd:req.body.dvd,
        	critic:{
				rating:req.body.criticrating,
				numReviews:req.body.criticnumReviews,
				meter:req.body.meter
        	},
			boxOffice:req.body.boxOffice,
			rotten:req.body.rotten,
			production:req.body.production,
			fresh:req.body.fresh
		}
	};

	var result = await index.updateMovieByID(data, id);
	if(result == true)
		res.send("Successfully Updated");
	else
		res.send("Update Failed");
});

// Delete Movie record based on ID
 app.delete('/api/movies/:movie_id', async function(req, res) {
	let id = req.params.movie_id;
	var result = await index.deleteMovieById(id);
	if (result){
		await res.send("Movie Deleted");
	}
	else{
		console.log("Movie not deleted");
	}
});

// Display UI for fetching Movie details based on PageNo, PageSize and Title.
app.get("/api/movieform",(req,res)=>{    
    res.render('moviedata'); 
});

// post method to fetch movie records
app.post("/api/movieform",async (req,res) => { 

	page = req.body.pageno;
	limit = req.body.pagesize;
	title = req.body.title;
	var result = await index.formMovie(page,limit,title);
	await res.render('movieresult', {data: result});
  }
)

// UI for user to Login
app.get("/",(req,res)=>{
	res.render('login');
});

// Post Method to Validate the user
app.post("/",async (req,res)=>{

	// Fetch Username and password from the Form
	username = req.body.username;
	password = req.body.password;

	var result =  await index.checkUser(username,password);
	if(await result == true)
		await res.render('loginsuccess')
	else
		await res.render('errorlogin')
});

// UI for user to register
app.get("/register",(req,res)=>{
	res.render("register");
})

// post method to record user details
app.post("/register",async (req,res)=>{

	username = req.body.reg_username;
	password = req.body.reg_password;
	var result = await index.addUserData(username,password);
	if(result == true)
		await res.render('registersuccess',{message:"User Registered Successfully"})
	else
		await res.render('registersuccess',{message:"User already exist"})
});