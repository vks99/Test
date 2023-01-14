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


// Checking
// Changes in Branch3
// Import mongoose and movie module
var mongoose = require('mongoose');
var Movies = require('./models/movie');
var user = require('./models/user');
const bcrypt = require('bcrypt');

// connect to mondoDb
async function intialize(dburl) {

    try {
        await mongoose.connect(dburl, { useNewUrlParser: true });
        return await true;
    } catch (error) {
        return await console.error(error);
    }   
}

// create a new record in collection
async function addNewMovieData(data){
    Movies.create(data);
    try{
        let movieresult = await Movies.findOne({plot:data.plot});
        return await movieresult;
    }catch(error){
        console.log(error);
    }
}

// fetch all movie records based on PageNo, PageSize and Title
async function getAllMovies(page,perPage,movietitle){
    try {
		const movie = await Movies.find().sort(
			{ _id: 1 }).limit(page*perPage); // find movie records based on PageNo, PageSize and sort in ascending order based on ID value.
        const movieData = movie.slice((page*perPage-perPage)); // fetch records which are required to display based on PageNo and PageSize.
            if(movietitle != null) // if movietitle is provided moves into the loop
            {
                movieData.forEach(element => {
                    if(element.title == movietitle){ 
                        titleresult = element;
                    }
                });
                return await titleresult;
            }
            else{
                return await movieData;
            } 
	}
	catch (error) {
		console.error(error);
	}
}

// fetch records based on ID
async function getMovieById(id){
    try{
        let movieresult = await Movies.findById(id);
        return await movieresult; 
    }catch(error){
        console.log(error);
    }
};

// Update records based on ID
async function updateMovieByID(data, id){

    try{
        await Movies.findByIdAndUpdate(id, data)
        return await true; 
    }catch(error){
        console.log(error);
    }
}

// Delete records based on ID
async function deleteMovieById(id){
    try{
        await Movies.remove({
            _id : id
        })
        return await true;
    }catch(error){
        console.log(error);
    }	
}

// Fetch Movierecords based on PageNo, PageSize and Title
async function formMovie(page,perPage,movietitle){
    try {
		const movie = await Movies.find().sort(
			{_id: 1 }).limit(page*perPage)
        const movieData = movie.slice(page*perPage-perPage);
        if(movietitle != null){
            movieData.forEach(element => {
                if(element.title == movietitle){
                    titleresult = element;
                }
            });
            return await titleresult;
        }
        else{
            return await movieData;
        }
	}
	catch (error) {
		console.error(error);
	}
}

async function addUserData(username, password) {
    try{

        let userresult = await user.findOne({username:username});
        if(userresult == null){
            let hash = await bcrypt.hash(password, 10); // Hash the password using a Salt that was generated using 10 rounds
            let userData = await new user({ username: username, password: password,hash : hash });
            await userData.save()
            return await true;
        }
        else{
            return await false;
        }
        console.log(userresult);
        // if(userresult)
    }catch(error){
        console.log(error);
    }
  }

  async function checkUser(username, password) {
    try{

        let userresult = await user.findOne({username:username});
        console.log(userresult);
        if( userresult != null){
            console.log("inside if loop");
            // compare the password from the form and hash code for the password
            var result = await bcrypt.compare(password, userresult.hash);
            console.log(result);
            console.log("checking");
            return await result;
        }
        else{
            return await false;
        }
        console.log(userresult);
        // if(userresult)
    }catch(error){
        console.log(error);
    }
  }

// Export all the Functions.
module.exports = {
    intialize: intialize,
    addNewMovieData: addNewMovieData,
    getMovieById: getMovieById,
    updateMovieByID: updateMovieByID,
    deleteMovieById: deleteMovieById,
    getAllMovies: getAllMovies,
    formMovie: formMovie,
    addUserData: addUserData,
    checkUser: checkUser
};