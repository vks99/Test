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

// Importing mongoose.
var mongoose = require('mongoose');

// Create Schema for the record.
var Schema = mongoose.Schema;
MovieSchema = new Schema({
    plot : String,
    genres : [String],
    runtime:Number,
    metacritic:Number,
	cast : [String],
    poster:String,
    num_mflix_comments : Number,
    title : String,
    fullplot : String,
    languages:[String],
    countries : [String],
    released : {type:Date},
    writers:[String],
    directors : [String],
    rated : String,
    awards : {
        wins:Number,
        nominations:Number,
        text:String
    },
    lastupdated:{type:Date},
    year:Number,
    imdb:{
        rating:Number,
        votes:Number,
        id:Number
    },
    type:String,
    tomatoes:{
        website:String,
        viewer:{
            rating:Number,
            numReviews:Number,
            meter:Number
        },
        dvd:{type:Date},
        critic:{
            rating:Number,
            numReviews:Number,
            meter:Number
        },
        boxOffice:String,
        rotten:Number,
        production:String,
        lastUpdated:{type:Date},
        fresh:Number
    }
});
module.exports = mongoose.model('movie', MovieSchema); // Create a model and export the model.