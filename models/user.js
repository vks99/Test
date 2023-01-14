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

UserSchema = new Schema({
    username : String,
    password : String,
    hash : String
});
module.exports = mongoose.model('userdata', UserSchema); // Create a model and export the model.