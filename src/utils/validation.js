const validator = require("validator");

const validateSignUpUser = (req) => {
    const {firstName, lastName,emailId, password, age, gender, photoUrl, about, hobbies} = req.body;

    if(!firstName){
        throw new Error("Enter valid name");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Enter valid emailId");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password. Password must have minimum 8 length and should contain 1 Uppercase character,1 lowercase character, 1 numeric value and 1 Special Character (@,#,$,%,^,&,*).");
    }
    if(age<18){
        throw new Error("Less than 18 Year Old are not allowed!");
    }
    if(hobbies.length>10){
        throw new Error("Hobbies exceeded above 10");
    }
};

const validateEditData = (req) =>{
    
    const ALLOWEDUPDATES = ["firstName","lastName","age","gender","photoUrl","about","hobbies"];

    const {firstName, lastName, age, gender, photoUrl, about, hobbies} = req.body;

    const isAllowed = Object.keys(req.body).every((field)=>ALLOWEDUPDATES.includes(field));

    if(firstName && firstName.length>80){
        throw new Error("First Name should not exceed 80");
    }

    if(lastName && lastName.length>100){
        throw new Error("Last Name should not exceed 100");
    }

    if(age && age<18){
        throw new Error("Age should not less than 18");
    }

    if(gender && !["male","Male","female","Female","Others","others","other","Other"].includes(gender)){
        throw new Error("Gender should be male/female/others");
    }

    if(photoUrl && !validator.isURL(photoUrl)){
        throw new Error("Invalid Photo URL");
    }

    if(hobbies.length>10){
        throw new Error("Hobbies should not exceed above 10");
    }

    return isAllowed;
};

const validateNewPassword = (password) => {
    if(!password){
        throw new Error("Please Enter new password!");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password. Password must have minimum 8 length and should contain 1 Uppercase character,1 lowercase character, 1 numeric value and 1 Special Character (@,#,$,%,^,&,*).");
    }
};

module.exports = {
    validateSignUpUser,
    validateEditData,
    validateNewPassword,
};