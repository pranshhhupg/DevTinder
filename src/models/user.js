const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
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
        default : "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg?w=768",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid url");
            }
        }
    },
    about : {
        type : String,
        maxLength : 80,
        default : "Hi there! I am using DevTinder"
    },
    hobbies : {
        type : [String],
    }
},
{
    timestamps : true,
});

userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({userId : user._id}, "devTinder@1210", {
        expiresIn : '1d'
    });

    return token;
}

userSchema.methods.validatePassword = async function(passwordGivenByUser) {
    const user = this;

    const isPasswordCorrect = await bcrypt.compare(passwordGivenByUser, user.password);
    
    return isPasswordCorrect;
}


module.exports = mongoose.model("User",userSchema);