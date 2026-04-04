const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        immutable : true,
        minLength : 2,
        maxLength : 80,
    },
    lastName : {
        type : String,
        minLength : 2,
        maxLength : 100,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        immutable : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    },
    password : {
        type : String,
        minLength : 6,
        maxLength : 20,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password");
            }
        }
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","other","Male","Female","Others"].includes(value)){
                throw new Error("Gender is invalid");
            }
        }
    },
    photoUrl : {
        type : String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid url");
            }
        }
    },
    about : {
        type : String,
        default : "Hi there! I am using DevTinder"
    },
    hobbies : {
        type : [String],
    }
},
{
    timestamps : true,
})

module.exports = mongoose.model("User",userSchema);