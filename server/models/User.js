const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName : {
        type : String,
        required : true,
    },

    lastName : {
        type : String,
        requried : true,
    },

    telephone : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required: true,
    },

    details : {
        type: String,
    },

    createdAt : {
        type : Date,
        default : Date.now
    },

    updatedAt : {
        type : Date,
        default : Date.now
    }


});


module.exports = mongoose.model('User' , userSchema);